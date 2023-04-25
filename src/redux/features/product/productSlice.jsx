import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItems: [],
  productSortType: "relevence",
  productLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductItems: (state, action) => {
      state.productItems = action.payload;
    },
    setProductSortType: (state, action) => {
      state.productSortType = action.payload;
    },
    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setProductItems, setProductSortType, setProductLoading } =
  productSlice.actions;
export const selectCurrentProductItems = (state) => state.product.productItems;
export const selectCurrentProductSortType = (state) =>
  state.product.productSortType;
export const selectCurrentProductLoading = (state) =>
  state.product.productLoading;
