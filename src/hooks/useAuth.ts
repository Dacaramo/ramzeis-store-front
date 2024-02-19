import {
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  signOut as amplifySignOut,
  autoSignIn,
  confirmSignUp,
  resendSignUpCode,
  fetchAuthSession,
} from 'aws-amplify/auth';
import useLocalStorage from './useLocalStorage';
import { CustomError } from '../model/otherSchemas';
import { createBuyer, getBuyer } from '../clients/axiosClient';
import { User, useStore } from '../zustand/store';
import { getDeviceDetails } from '../utils/getDeviceDetails';
import { Buyer } from '../model/Buyer';

export type AuthStep = 'CONFIRMATION_PENDING' | 'DONE';
export type AuthType = 'SIGN_UP' | 'SIGN_IN';

const useAuth = () => {
  const {
    setUserInLocalStorage,
    getCartFromLocalStorage,
    removeUserFromLocalStorage,
  } = useLocalStorage();
  const [setUser, setCartDetails] = useStore((state) => {
    return [state.setUser, state.setCartDetails];
  });

  const signUp = async (
    email: string,
    phone: string,
    password: string
  ): Promise<void> => {
    const response = await amplifySignUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          name: 'none',
          picture: 'none',
          phone_number: phone,
        },
        autoSignIn: true,
      },
    });

    await createBuyer(
      email,
      [
        {
          documentName: 'Terms and conditions',
          documentVersion: '1.0.0',
          acceptanceTimestamp: new Date().toISOString(),
          acceptanceDeviceDetails: getDeviceDetails() as Record<
            string,
            unknown
          >,
        },
      ] as Omit<Buyer['buyerAgreements'], 'acceptanceIP'>,
      getCartFromLocalStorage()
    );

    if (response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      return;
    }

    throw new CustomError('UnknownAuthStep');
  };

  const concludeSignIn = async (email: string) => {
    const { tokens } = await fetchAuthSession();

    if (!tokens) {
      throw new CustomError('SessionWithoutPreviousSignIn');
    } else if (!tokens.idToken) {
      throw new CustomError('MissingIdToken');
    }

    const buyer = await getBuyer(email);

    const user: User = {
      isAuthenticated: true,
      data: {
        email: buyer.pk,
        stripeCustomerId: buyer.buyerStripeCustomerId,
        agreements: buyer.buyerAgreements,
      },
      tokens: {
        idToken: tokens!.idToken!.toString(),
        accessToken: tokens!.accessToken.toString(),
      },
    };

    setUser(user);
    setCartDetails(buyer.buyerCartDetails);
    setUserInLocalStorage(user);
  };

  const signIn = async (email: string, password: string): Promise<AuthStep> => {
    const response = await amplifySignIn({
      username: email,
      password: password,
    });

    if (response.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      resendSignUpCode({
        username: email,
      });
      return 'CONFIRMATION_PENDING';
    } else if (response.nextStep.signInStep === 'DONE') {
      await concludeSignIn(email);
      return 'DONE';
    }

    throw new CustomError('UnknownAuthStep');
  };

  const signOut = async () => {
    await amplifySignOut();
    setUser({
      isAuthenticated: false,
    });
    removeUserFromLocalStorage();
  };

  const confirmAccount = async (email: string, confirmationCode: string) => {
    const confirmationResponse = await confirmSignUp({
      username: email,
      confirmationCode,
    });

    if (confirmationResponse.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      await autoSignIn();
      await concludeSignIn(email);
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    confirmAccount,
  };
};

export default useAuth;
