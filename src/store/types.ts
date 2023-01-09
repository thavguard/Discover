import { IItem, IItemType } from "../components/Item/types";

export interface ItemsState {
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
