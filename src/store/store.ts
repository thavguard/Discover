import { authSlice } from "./slices/auth.slice";
import { cartSlice } from "./slices/cart.slice";
import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./slices/items.slice";

export const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
