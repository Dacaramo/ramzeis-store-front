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
  cart: {
    details: Buyer['buyerCartDetails'];
    products: Array<Product>;
  };
  globalAlertProps?: ComponentProps<typeof Alert>;
  setUser: (user: User) => void;
  addProductToCart: (
    detail: Buyer['buyerCartDetails'][string],
    product: Product
  ) => void;
  removeProductFromCart: (productId: ProductId) => void;
  clearCart: () => void;
  setCartDetails: (details: Buyer['buyerCartDetails']) => void;
  setCartProducts: (products: Array<Product>) => void;
  setGlobalAlertProps: (props?: ComponentProps<typeof Alert>) => void;
}

export const useStore = create<StoreState>()((set) => {
  return {
    user: {
      isAuthenticated: false,
      data: undefined,
      tokens: undefined,
    },
    cart: {
      details: {},
      products: [],
    },
    globalAlertProps: undefined,
    setUser: (user: User) => {
      return set((_) => {
        return {
          user,
        };
      });
    },
    addProductToCart: (
      detail: Buyer['buyerCartDetails'][string],
      product: Product
    ) => {
      return set((state) => {
        return {
          cart: {
            details: {
              ...state.cart.details,
              [product.pk]: detail,
            },
            products: [...state.cart.products, product],
          },
        };
      });
    },
    removeProductFromCart: (productId: ProductId) => {
      return set((state) => {
        const newDetails = { ...state.cart.details };
        delete newDetails[productId];
        return {
          cart: {
            details: newDetails,
            products: state.cart.products.filter((product) => {
              return product.pk !== productId;
            }),
          },
        };
      });
    },
    clearCart: () => {
      return set((_) => {
        return {
          cart: {
            details: {},
            products: [],
          },
        };
      });
    },
    setCartDetails: (details: Buyer['buyerCartDetails']) => {
      return set((_) => {
        return {
          cart: {
            details,
            products: [],
          },
        };
      });
    },
    setCartProducts: (products: Array<Product>) => {
      return set((state) => {
        return {
          cart: {
            ...state.cart,
            products,
          },
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
