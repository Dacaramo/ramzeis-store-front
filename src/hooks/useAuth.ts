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
    const lowercaseEmail = email.toLowerCase();

    const response = await amplifySignUp({
      username: lowercaseEmail,
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
      lowercaseEmail,
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
    const lowercaseEmail = email.toLowerCase();
    const { tokens } = await fetchAuthSession();

    if (!tokens) {
      throw new CustomError('SessionWithoutPreviousSignIn');
    } else if (!tokens.idToken) {
      throw new CustomError('MissingIdToken');
    }

    let buyer = await getBuyer(lowercaseEmail);

    if (!buyer) {
      buyer = await createBuyer(
        lowercaseEmail,
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
    }

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
    const lowercaseEmail = email.toLowerCase();
    const response = await amplifySignIn({
      username: lowercaseEmail,
      password: password,
    });

    if (response.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      resendSignUpCode({
        username: lowercaseEmail,
      });
      return 'CONFIRMATION_PENDING';
    } else if (response.nextStep.signInStep === 'DONE') {
      await concludeSignIn(lowercaseEmail);
      return 'DONE';
    }

    throw new CustomError('UnknownAuthStep');
  };

  const signOut = async () => {
    await amplifySignOut();
    /**
     * Everything after this line won't be executed when signOut is called for an user that is authenticated with an auth provider (e.g. Google). This is because on that specific case calling amplifySignOut will immediately after completion redirect the user to the redirect sign out url, there's no time to execute what comes below.
     */
    setUser({
      isAuthenticated: false,
    });
    removeUserFromLocalStorage();
  };

  const confirmAccount = async (email: string, confirmationCode: string) => {
    const lowercaseEmail = email.toLowerCase();

    const confirmationResponse = await confirmSignUp({
      username: lowercaseEmail,
      confirmationCode,
    });

    if (confirmationResponse.nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      await autoSignIn();
      await concludeSignIn(lowercaseEmail);
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    concludeSignIn,
    confirmAccount,
  };
};

export default useAuth;
