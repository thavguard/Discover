import { IItem, IItemType } from "../components/Item/types";

export interface ItemsState {
    items: IItem[];
    itemTypes: IItemType[];
    activeItem: IItem;
    itemCharacteristics: ItemCharacteristic[];
    itemsLoading: boolean
}

export interface ItemCharacteristic {
    title: string;
    id: number;
}

// export interface ItemCharacteristicInput {
//     title: string;
//     description: string;
// }
