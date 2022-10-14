export interface IItem {
  id: number;
  name: string;
  description: string;
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
  subject?: string;
  city: string;
  street: string;
  house?: string;
  area?: string;
}
