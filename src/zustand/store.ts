import { create } from 'zustand';
import { Buyer } from '../model/Buyer';
import { Product, ProductId } from '../model/Product';
import { ComponentProps } from 'react';
import Alert from '../components/Alert/Alert';

export interface UserData {
  email: Buyer['pk'];
  phone?: string | 'none';
  name?: string | 'none';
  picture?: string | 'none';
  stripeCustomerId: Buyer['buyerStripeCustomerId'];
  agreements: Buyer['buyerAgreements'];
}

export interface UserTokens {
  idToken: string;
  accessToken: string;
}

export interface User {
  isAuthenticated: boolean;
  data?: UserData;
  tokens?: UserTokens;
}

interface StoreState {
  user: User;
  cartDetails: Buyer['buyerCartDetails'];
  globalAlertProps?: ComponentProps<typeof Alert>;
  setUser: (user: User) => void;
  addProductToCart: (
    productId: Product['pk'],
    detail: Buyer['buyerCartDetails'][string]
  ) => void;
  removeProductFromCart: (productId: ProductId) => void;
  clearCart: () => void;
  updateCartDetail: (
    productId: ProductId,
    detailPropName: keyof Buyer['buyerCartDetails'][string],
    detailPropValue: Buyer['buyerCartDetails'][string][keyof Buyer['buyerCartDetails'][string]]
  ) => void;
  setCartDetails: (cartDetails: Buyer['buyerCartDetails']) => void;
  setGlobalAlertProps: (props?: ComponentProps<typeof Alert>) => void;
}

export const useStore = create<StoreState>()((set) => {
  return {
    user: {
      isAuthenticated: false,
      data: undefined,
      tokens: undefined,
    },
    cartDetails: {},
    globalAlertProps: undefined,
    setUser: (user: User) => {
      return set((_) => {
        return {
          user,
        };
      });
    },
    addProductToCart: (
      productId: Product['pk'],
      detail: Buyer['buyerCartDetails'][string]
    ) => {
      return set((state) => {
        return {
          cartDetails: {
            ...state.cartDetails,
            [productId]: detail,
          },
        };
      });
    },
    removeProductFromCart: (productId: ProductId) => {
      return set((state) => {
        const newDetails = { ...state.cartDetails };
        delete newDetails[productId];
        return {
          cartDetails: newDetails,
        };
      });
    },
    clearCart: () => {
      return set((_) => {
        return {
          cartDetails: {},
        };
      });
    },
    updateCartDetail: (
      productId: ProductId,
      detailPropName: keyof Buyer['buyerCartDetails'][string],
      detailPropValue: Buyer['buyerCartDetails'][string][keyof Buyer['buyerCartDetails'][string]]
    ) => {
      return set((state) => {
        return {
          cartDetails: {
            ...state.cartDetails,
            [productId]: {
              ...state.cartDetails[productId],
              [detailPropName]: detailPropValue,
            },
          },
        };
      });
    },
    setCartDetails: (cartDetails: Buyer['buyerCartDetails']) => {
      return set((_) => {
        return {
          cartDetails,
        };
      });
    },
    setGlobalAlertProps: (props?: ComponentProps<typeof Alert>) => {
      return set((_) => {
        return {
          globalAlertProps: props,
        };
      });
    },
  };
});
