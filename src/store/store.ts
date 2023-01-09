import { authSlice } from "./slices/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { itemsSlice } from "../components/Item/slice/items.slice";
import { homeSlice } from "../components/Home/slice/home.slice";
import { searchSlice } from "../components/Search/slice/search.slice";

export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        search: searchSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
