import { IUser } from "./IUser";

export interface AuthSlice {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
}
