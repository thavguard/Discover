import { authSlice } from "./slices/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "./slices/items/items.slice";

export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
