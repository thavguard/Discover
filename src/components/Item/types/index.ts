export interface IItem {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    image: string;
    price: number;
    rating: number;
    address: IAddress;
    createdAt: string;
    updatedAt: string;
    itemTypeId: number;
    info: IItemInfo[];
    tel: string;
    userId: number;
    ref?: any
}

export interface IItemType {
    id: number;
    name: string;
}

export interface IItemInfo {
    title: string;
    description: string;
}

export interface IAddress {
    region: string;
    city: string;
    street: string;
    house: string;
    area: string;
}

export interface IItemInfo {
    title: string;
    description: string;
}

export interface IFormItems {
    image: File;
    name: string;
    description: string;
    price: number;
    itemTypeId: number;
    info: IItemInfo[];
    address: IAddress;
    tel: string;
}

export interface ICreateItem {
    image: File;
    name: string;
    description: string;
    price: string;
    itemTypeId: string;
    info: string;
    address: string;
    tel: string;
    wasCreated: number
}

export interface IItems {
    items: IItem[]
    totalPages: number
}
