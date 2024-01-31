import axios from 'axios';
import { ListResponse } from '../model/ListResponse';
import {
  Product,
  ProductCategory,
  ProductColor,
  ProductFilterValues,
} from '../model/Product';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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