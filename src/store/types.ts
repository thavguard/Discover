export interface IRegistration {
  email: string;
  password: string;
  username: string;
  avatar: string;
}

export interface IItemInfo {
  title: string;
  description: string;
}

export interface ICreateItem {
  image: File;
  name: string;
  description: string;
  price: number;
  itemTypeId: number;
  info: IItemInfo[];
  address: string;
}
