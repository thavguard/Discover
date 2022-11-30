import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IFilterItems, IHomeState } from "../types/types";
import { IItems } from "../../Item/types";
import { axios } from "../../../API/axios";

const initialState = {
    items: [],
    totalPages: 0,
    itemsLoading: false,
    filter: {
        itemTypeId: '',
        creator: '',
        name: '',
        price: ['', ''],
        wasCreated: Date.now().toString(),
    },
    page: 1,
} as IHomeState

console.log(Date.now());

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<IItems>) => {
            //   if (state.items[0]?.id !== action.payload.items[0]?.id) { TODO: пофиксить костыль
            state.items = action.payload.items
            state.totalPages = action.payload.totalPages
            // }
        },
        setItemsLoading: (state, action: PayloadAction<boolean>) => {
            state.itemsLoading = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setFilter: (state, action: PayloadAction<IFilterItems>) => {
            state.filter = action.payload
        }
    }

})

export const fetchHomeItems = ({ page, filter }: { page?: number, filter?: IFilterItems }
) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(homeSlice.actions.setItemsLoading(true))
            const { data } = await axios.get<IItems>('api/item', {
                params: {
                    page,
                    ...filter
                }
            })
            dispatch(homeSlice.actions.setItems(data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(homeSlice.actions.setItemsLoading(false))
        }
    }
