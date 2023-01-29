import { IItem, IItemType } from "../components/Item/types";

export interface ItemsState {
    itemTypes: IItemType[];
    activeItem: IItem;
    itemCharacteristics: ItemCharacteristic[];
    itemsLoading: boolean
    favoriteItems: favoriteItem[]
}

export interface ItemCharacteristic {
    title: string;
    id: number;
}

export interface favoriteItem {
    id: number
    createdAt: string
    updatedAt: string
    favoriteId: number
    itemId: number

}
