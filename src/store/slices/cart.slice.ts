import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types/types";

interface Cart {
  cart: number[];
}

const initialState: Cart = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      if (!state.cart.find((e) => e === action.payload)) {
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((e) => e !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
