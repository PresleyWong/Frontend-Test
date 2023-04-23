import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products?limit=10",
    }),
    getProductDetail: builder.query({
      query: (productId) => `products/${productId}`,
    }),
    getProductSearch: builder.query({
      query: (keyword) => `products/search?q=${keyword}&limit=10`,
    }),
    getProductByCategory: builder.query({
      query: (category) => `products/category/${category}?limit=10`,
    }),
    getAllProductCategories: builder.query({
      query: () => "products/categories/",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetProductSearchQuery,
  useGetProductByCategoryQuery,
  useGetAllProductCategoriesQuery,
} = productApi;
