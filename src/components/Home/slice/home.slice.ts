import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IFilterItems, IHomeState } from "../types/types";
import { IItemsResponse } from "../../Item/types";
import { axios } from "../../../API/axios";
import { number } from "yup";

const initialState = {
    items: [],
    total: {
        price: 0,
        length: 0,
        pages: 0,
    },
    itemsLoading: false,
    filter: {
        itemTypeId: "",
        creator: "",
        name: "",
        price: [0, Infinity],
        wasCreated: "",
        userId: 0,
        itemId: [],
    },
    page: 1,
} as IHomeState;

console.log(Date.now());

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IItemsResponse>) => {
            //   if (state.items[0]?.id !== action.payload.items[0]?.id) { TODO: пофиксить костыль
            state.items = action.payload.items;
            state.total = action.payload.total;
            // }
        },
        setItemsLoading: (state, action: PayloadAction<boolean>) => {
            state.itemsLoading = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setFilter: (state, action: PayloadAction<IFilterItems>) => {
            state.filter = action.payload;
        },
    },
});

export const fetchHomeItems =
    ({ page, filter }: { page?: number; filter?: IFilterItems }) =>
        async (dispatch: Dispatch) => {
            try {
                dispatch(homeSlice.actions.setItemsLoading(true));
                const { data } = await axios.get<IItemsResponse>("api/item", {
                    params: {
                        page,
                        ...filter,
                    },
                });
                dispatch(homeSlice.actions.setItems(data));
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(homeSlice.actions.setItemsLoading(false));
            }
        };
