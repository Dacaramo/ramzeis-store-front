import { updateBuyer } from '../clients/axiosClient';
import { Buyer } from '../model/Buyer';
import { Product } from '../model/Product';
import { useStore } from '../zustand/store';
import useLocalStorage from './useLocalStorage';

const useCart = () => {
  const [
    user,
    cartDetails,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    updateCartDetail,
  ] = useStore((state) => {
    return [
      state.user,
      state.cartDetails,
      state.addProductToCart,
      state.removeProductFromCart,
      state.clearCart,
      state.updateCartDetail,
    ];
  });
  const {
    addProductToLocalStorageCart,
    removeProductFromLocalStorageCart,
    clearLocalStorageCart,
    updateLocaleStorageCartProduct,
  } = useLocalStorage();

  const add = async (
    productId: Product['pk'],
    productDetails: Buyer['buyerCartDetails'][string]
  ) => {
    if (!user.isAuthenticated && !user.data) {
      addProductToLocalStorageCart(productId, productDetails);
    } else if (user.isAuthenticated && user.data) {
      await updateBuyer(user.data.email, {
        buyerCartDetails: {
          ...cartDetails,
          [productId]: productDetails,
        },
      });
    }

    addProductToCart(productId, productDetails);
  };

  const remove = async (productId: Product['pk']) => {
    if (!user.isAuthenticated && !user.data) {
      removeProductFromLocalStorageCart(productId);
    } else if (user.isAuthenticated && user.data) {
      const newCartDetails = { ...cartDetails };
      delete newCartDetails[productId];
      await updateBuyer(user.data.email, {
        buyerCartDetails: newCartDetails,
      });
    }

    removeProductFromCart(productId);
  };

  const update = async (
    productId: Product['pk'],
    propNameToUpdate: keyof Buyer['buyerCartDetails'][string],
    propValueToUpdate: Buyer['buyerCartDetails'][string][keyof Buyer['buyerCartDetails'][string]]
  ) => {
    if (!user.isAuthenticated && !user.data) {
      updateLocaleStorageCartProduct(
        productId,
        propNameToUpdate,
        propValueToUpdate
      );
    } else if (user.isAuthenticated && user.data) {
      await updateBuyer(user.data.email, {
        // @ts-ignore
        buyerCartDetails: {
          ...cartDetails,
          [propNameToUpdate]: propValueToUpdate,
        },
      });
    }

    updateCartDetail(productId, propNameToUpdate, propValueToUpdate);
  };

  const clear = async () => {
    if (!user.isAuthenticated && !user.data) {
      clearLocalStorageCart();
    } else if (user.isAuthenticated && user.data) {
      await updateBuyer(user.data.email, {
        buyerCartDetails: {},
      });
    }

    clearCart();
  };

  return {
    add,
    remove,
    update,
    clear,
  };
};

export default useCart;
