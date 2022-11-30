import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../../API/axios";
import { IItem, IItemType } from "../../../components/Item/types";
import { ItemCharacteristic, ItemsState } from "../../types";

const initialState: ItemsState = {
    items: [],
    itemTypes: [],
    activeItem: {} as IItem,
    itemCharacteristics: [],
    itemsLoading: false
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
        setActiveItem: (state, action: PayloadAction<IItem>) => {
            state.activeItem = action.payload;
        },
        setItemCharacteristics: (
            state,
            action: PayloadAction<ItemCharacteristic[]>
        ) => {
            state.itemCharacteristics = action.payload;
        },
        setItemsLoading: (state, action: PayloadAction<boolean>) => {
            state.itemsLoading = action.payload
        }

    },
});

export const fetchItems = (limit?: number) => async (dispatch: Dispatch) => {
    dispatch(itemsSlice.actions.setItemsLoading(true))
    const { data } = await axios.get("/api/item", {
        params: {
            limit
        }
    });
    dispatch(itemsSlice.actions.setItems(data));
    dispatch(itemsSlice.actions.setItemsLoading(false))
};

export const createItem =
    (formData: FormData) => async (dispatch: Dispatch) => {
        const { data } = await axios.post<IItem>("/api/item", formData);
        return data
    };

export const fetchItemTypes = (id?: number) => async (dispatch: Dispatch) => {
    const { data } = await axios.get<IItemType[]>(`/api/itemType`, {
        params: { id },
    });
    dispatch(itemsSlice.actions.setItemTypes(data));
};

export const fetchActiveItem = (id: number) => async (dispatch: Dispatch) => {
    dispatch(itemsSlice.actions.setActiveItem({} as IItem));
    const { data } = await axios.get<IItem>("/api/item/" + id);
    dispatch(itemsSlice.actions.setActiveItem(data));
};

export const fetchItemCharacteristics =
    (itemTypeId: string) => async (dispatch: Dispatch) => {
        const { data } = await axios.get<ItemCharacteristic[]>("/api/itemChar", {
            params: {
                itemTypeId,
            },
        });

        dispatch(itemsSlice.actions.setItemCharacteristics(data));
    };
