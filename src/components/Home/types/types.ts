import { IItem } from "../../Item/types";

export interface IHomeState {
    items: IItem[],
    totalPages: number
    itemsLoading: boolean
    filter: IFilterItems
    page: number
}

export interface IFilterItems {
    itemTypeId: string
    creator: string,
    wasCreated: string,
    name: string,
    price: [start: string, end: string]
}


