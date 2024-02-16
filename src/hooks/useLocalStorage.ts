import { Buyer } from '../model/Buyer';
import { Product, ProductId } from '../model/Product';
import { User } from '../zustand/store';

type valueof<T> = T[keyof T];

const useLocalStorage = () => {
  const setUserInLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const getUserFromLocalStorage = (): User => {
    const stringifiedUser = localStorage.getItem('user');
    return stringifiedUser
      ? JSON.parse(stringifiedUser)
      : {
          isAuthenticated: false,
        };
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const getCartFromLocalStorage = (): Buyer['buyerCartDetails'] => {
    const stringifiedCartDetails = localStorage.getItem('cart');
    const cartDetails: Buyer['buyerCartDetails'] = stringifiedCartDetails
      ? JSON.parse(stringifiedCartDetails)
      : {};
    return cartDetails;
  };

  const addProductToLocalStorageCart = (
    productId: Product['pk'],
    productDetails: Buyer['buyerCartDetails'][number]
  ) => {
    const stringifiedPreviousCartDetails = localStorage.getItem('cart');
    const previousCartDetails = stringifiedPreviousCartDetails
      ? JSON.parse(stringifiedPreviousCartDetails)
      : {};
    const currentCartDetails: Buyer['buyerCartDetails'] = {
      ...previousCartDetails,
      [productId]: productDetails,
    };
    localStorage.setItem('cart', JSON.stringify(currentCartDetails));
  };

  const updateLocaleStorageCartProduct = (
    productId: Product['pk'],
    propName: keyof Buyer['buyerCartDetails'][number],
    propValue: valueof<Buyer['buyerCartDetails'][number]>
  ) => {
    const stringifiedCartDetails = localStorage.getItem('cart');
    const cartDetails: Buyer['buyerCartDetails'] = stringifiedCartDetails
      ? JSON.parse(stringifiedCartDetails)
      : {};
    cartDetails[productId][propName] = propValue as never;
    localStorage.setItem('cart', JSON.stringify(cartDetails));
  };

  const removeProductFromLocalStorageCart = (productId: Product['pk']) => {
    const stringifiedCartDetails = localStorage.getItem('cart');
    const cartDetails = stringifiedCartDetails
      ? JSON.parse(stringifiedCartDetails)
      : {};
    delete cartDetails[productId];
    localStorage.setItem('cart', JSON.stringify(cartDetails));
  };

  return {
    setUserInLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    getCartFromLocalStorage,
    addProductToLocalStorageCart,
    updateLocaleStorageCartProduct,
    removeProductFromLocalStorageCart,
  };
};

export default useLocalStorage;
