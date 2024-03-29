import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../../API/axios";
import { IItem, IItemType } from "../types";
import { favoriteItem, ItemCharacteristic, ItemsState } from "../../../store/types";

const initialState: ItemsState = {
    itemTypes: [],
    activeItem: {} as IItem,
    itemCharacteristics: [],
    itemsLoading: false,
    favoriteItems: [],
};

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
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
        },
        setFavoriteItems: (state, action: PayloadAction<favoriteItem[]>) => {
            state.favoriteItems = action.payload
        }
    },
});


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

export const fetchFavoriteItems = () => async (dispatch: Dispatch) => {
    const { data } = await axios.get('/api/fav')
    dispatch(itemsSlice.actions.setFavoriteItems(data))
}

export const addFavoriteItem = (itemId: number) => async (dispatch: Dispatch) => {
    try {
        await axios.post('/api/fav', {
            itemId
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const removeFavoriteItem = (itemId: number) => async (dispatch: Dispatch) => {
    try {
        await axios.delete('/api/fav', {
            data: {
                itemId
            }
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
