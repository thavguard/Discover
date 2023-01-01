import { IItem } from "../../Item/types";

export interface IHomeState {
  items: IItem[];
  total: ITotalItems;
  itemsLoading: boolean;
  filter: IFilterItems;
  page: number;
}

export interface IFilterItems {
  itemTypeId: string;
  creator: string;
  wasCreated: string;
  name: string;
  price: number[];
}

export interface ITotalItems {
  price: number;
  length: number;
  pages: number;
}
