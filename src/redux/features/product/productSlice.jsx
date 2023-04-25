import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productSortType: "relevence",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductSortType: (state, action) => {
      state.productSortType = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setProductSortType } = productSlice.actions;
export const selectCurrentProductSortType = (state) =>
  state.product.productSortType;
