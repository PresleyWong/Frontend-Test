import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItems: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductItems: (state, action) => {
      state.productItems = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setProductItems } = productSlice.actions;
export const selectCurrentProductItems = (state) => state.product.productItems;
