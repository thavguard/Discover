import { IItem, IItemType } from "./../../types/types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../API/axios";

interface ItemsState {
  items: IItem[];
  itemTypes: IItemType[];
}

const initialState: ItemsState = {
  items: [],
  itemTypes: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload;
    },
    setItemTypes: (state, action: PayloadAction<IItemType[]>) => {
      state.itemTypes = action.payload;
    },
  },
});

export const fetchItems = () => async (dispatch: Dispatch) => {
  const { data } = await axios.get("/api/item");
  dispatch(itemsSlice.actions.setItems(data));
};

export const createItem =
  (formData: FormData) => async (dispatch: Dispatch) => {
    await axios.post("/api/item", formData);
  };

export const fetchItemTypes = (id?: number) => async (dispatch: Dispatch) => {
  const { data } = await axios.get<IItemType[]>(`/api/itemType`, {
    params: { id },
  });
  dispatch(itemsSlice.actions.setItemTypes(data));
};
