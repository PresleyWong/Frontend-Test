import { indexApi } from "./indexApi";

const extendedIndexApi = indexApi.injectEndpoints({
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products?limit=10",
      providesTags: ["Product"],
    }),
    getProductDetail: builder.query({
      query: (productId) => `products/${productId}`,
      providesTags: ["Product"],
    }),
    getProductSearch: builder.query({
      query: (keyword) => `products/search?q=${keyword}&limit=10`,
      providesTags: ["Product"],
    }),
    getProductByCategory: builder.query({
      query: (category) => `products/category/${category}?limit=10`,
      providesTags: ["Product"],
    }),
    getAllProductCategories: builder.query({
      query: () => "products/categories/",
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetProductSearchQuery,
  useGetProductByCategoryQuery,
  useGetAllProductCategoriesQuery,
} = extendedIndexApi;
