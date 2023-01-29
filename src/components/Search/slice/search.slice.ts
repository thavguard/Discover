import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../../API/axios";
import { number } from "yup";
import { IItem, IItemsResponse } from "../../Item/types";
import { IFilterItems, ITotalItems } from "../../Home/types/types";

const initialState: ISearchState = {
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
};


export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IItemsResponse>) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
        },
        setItemsLoading: (state, action: PayloadAction<boolean>) => {
            state.itemsLoading = action.payload;
        },
        setFilter: (state, action: PayloadAction<IFilterItems>) => {
            state.filter = action.payload;
        },
    },
});

export const fetchSearchItems =
    ({ filter }: { filter?: IFilterItems }) =>
        async (dispatch: Dispatch) => {
            try {
                dispatch(searchSlice.actions.setItemsLoading(true));
                const { data } = await axios.get<IItemsResponse>("api/item", {
                    params: {
                        ...filter,
                    },
                });
                dispatch(searchSlice.actions.setItems(data));
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(searchSlice.actions.setItemsLoading(false));
            }
        };

export interface ISearchState {
    items: IItem[];
    total: ITotalItems;
    itemsLoading: boolean;
    filter: IFilterItems;
    page: number;
}

