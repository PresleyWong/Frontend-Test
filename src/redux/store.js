import { configureStore } from "@reduxjs/toolkit";
import { indexApi } from "./api/indexApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    [indexApi.reducerPath]: indexApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([indexApi.middleware]),
});
