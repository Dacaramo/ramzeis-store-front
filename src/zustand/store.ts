import { createStore } from 'zustand';
import { Buyer } from '../model/Buyer';
import { Product, ProductId } from '../model/Product';

export interface User {
  email: Buyer['pk'];
  phone: string;
  name: string | 'none';
  picture: string | 'none';
  stripeCustomerId: Buyer['buyerStripeCustomerId'];
  agreements: Buyer['buyerAgreements'];
}

interface StoreState {
  user?: User;
  cart: {
    details: Buyer['buyerCartDetails'];
    products: Array<Product>;
  };
  setUser: (user: User) => void;
  addProduct: (
    detail: Buyer['buyerCartDetails'][string],
    product: Product
  ) => void;
  removeProduct: (productId: ProductId) => void;
  clearCart: () => void;
}

export const useStore = createStore<StoreState>()((set) => {
  return {
    user: undefined,
    cart: {
      details: {},
      products: [],
    },
    setUser: (user: User) => {
      return set((_) => {
        return {
          user,
        };
      });
    },
    addProduct: (
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
    removeProduct: (productId: ProductId) => {
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
  };
});
