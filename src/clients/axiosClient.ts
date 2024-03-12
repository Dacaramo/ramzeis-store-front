import axios from 'axios';
import { ListResponse } from '../model/ListResponse';
import {
  Product,
  ProductCategory,
  ProductColor,
  ProductFilterValues,
} from '../model/Product';
import { Buyer, BuyerPatch } from '../model/Buyer';
import { Address, AddressFilterValues, AddressPatch } from '../model/Address';
import { PaymentMethod } from '@stripe/stripe-js';
import { Review, ReviewFilterValues } from '../model/Review';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createBuyer = async (
  buyerEmail: Buyer['pk'],
  buyerAgreements: Omit<Buyer['buyerAgreements'], 'acceptanceIP'>,
  buyerCartDetails?: Buyer['buyerCartDetails']
): Promise<Buyer> => {
  const { data } = await axiosClient.post<Buyer>('/buyers', {
    buyerEmail,
    buyerCartDetails,
    buyerAgreements,
  });
  return data;
};

export const getBuyer = async (
  buyerEmail: Buyer['pk']
): Promise<Buyer | null> => {
  const { data } = await axiosClient.get<Buyer>(`/buyers/${buyerEmail}`);
  return data;
};

export const deleteBuyer = async (buyerEmail: Buyer['pk']): Promise<void> => {
  await axiosClient.delete(`/buyers/${buyerEmail}`);
};

export const getProducts = async (
  productFilterValues: ProductFilterValues
): Promise<ListResponse<Product>> => {
  const { data } = await axiosClient.get<ListResponse<Product>>('/products', {
    params: productFilterValues,
  });
  return data;
};

export const getFeaturedProducts = async (): Promise<Array<Product>> => {
  const { data } = await axiosClient.get<Array<Product>>('/featured-products');
  return data;
};

export const getProductCategories = async (): Promise<
  Array<ProductCategory>
> => {
  const { data } = await axiosClient.get<Array<ProductCategory>>(
    '/product-categories'
  );
  return data;
};

export const getProductColors = async (): Promise<Array<ProductColor>> => {
  const { data } = await axiosClient.get('/product-colors');
  return data;
};

export const getAddresses = async (
  buyerEmail: Buyer['pk'],
  addressFilterValues: AddressFilterValues
): Promise<ListResponse<Address>> => {
  const { data } = await axiosClient.get(`/buyers/${buyerEmail}/addresses`, {
    params: addressFilterValues,
  });
  return data;
};

export const createAddress = async (
  buyerEmail: Buyer['pk'],
  address: Omit<Address, 'pk' | 'sk'>
): Promise<void> => {
  await axiosClient.post(`/buyers/${buyerEmail}/addresses`, address);
};

export const deleteAddress = async (
  buyerEmail: Buyer['pk'],
  addressId: Address['sk']
): Promise<void> => {
  await axiosClient.delete(`/buyers/${buyerEmail}/addresses/${addressId}`);
};

export const updateAddress = async (
  buyerEmail: Buyer['pk'],
  addressId: Address['sk'],
  patch: AddressPatch
): Promise<void> => {
  await axiosClient.patch(
    `/buyers/${buyerEmail}/addresses/${addressId}`,
    patch
  );
};

export const getStripePublishableKey = async (): Promise<string> => {
  const {
    data: { publishableKey },
  } = await axiosClient.get<{ publishableKey: string }>(
    '/stripe-publishable-key'
  );
  return publishableKey;
};

export const createSetupIntent = async (
  buyerStripeCustomerId: string,
  stripePaymentMethodId: string
): Promise<string> => {
  const {
    data: { clientSecret },
  } = await axiosClient.post<{ clientSecret: string }>(
    `/stripe-customers/${buyerStripeCustomerId}/payment-methods`,
    {
      stripePaymentMethodId,
    }
  );
  return clientSecret;
};

export const getPaymentMethodsPerBuyer = async (
  buyerStripeCustomerId: string,
  paymentMethodFilterValues: {
    limit?: number | undefined;
    encodedExclusiveStartKey?: string | undefined;
  }
): Promise<ListResponse<PaymentMethod>> => {
  const { data } = await axiosClient.get<ListResponse<PaymentMethod>>(
    `/stripe-customers/${buyerStripeCustomerId}/payment-methods`,
    {
      params: paymentMethodFilterValues,
    }
  );
  return data;
};

export const detachPaymentMethod = async (
  stripePaymentMethodId: string
): Promise<void> => {
  await axiosClient.delete(`/payment-methods/${stripePaymentMethodId}`);
};

export const getReviewsPerProduct = async (
  productId: Product['pk'],
  reviewFilterValues: ReviewFilterValues
): Promise<ListResponse<Review>> => {
  const { data } = await axiosClient.get<ListResponse<Review>>(
    `/products/${productId}/reviews`,
    {
      params: reviewFilterValues,
    }
  );
  return data;
};

export const updateBuyer = async (
  buyerEmail: Buyer['pk'],
  patch: BuyerPatch
): Promise<void> => {
  await axiosClient.patch(`/buyers/${buyerEmail}`, patch);
};
