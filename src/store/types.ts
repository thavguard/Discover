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
  price: number | string;
  itemTypeId: number | string;
  info: IItemInfo[] | string;
  address: string;
}
