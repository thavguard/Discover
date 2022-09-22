import { ItemType } from "./../../types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../API/axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const {data} = await axios.get("/api/item");
  return data
});

interface ItemsState {
  items: ItemType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ItemsState = {
  items: [],
  loading: "idle",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
