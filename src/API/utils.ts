import { axios } from "./axios";
import { IUser } from "../store/slices/auth/types";
import { IFilterItems } from "../components/Home/types/types";
import { IItem, IItemsResponse } from "../components/Item/types";

export const getUserById = async (id: number) => {
    const { data } = await axios.get<IUser>('api/user/' + id)

    return data
}
export const getUserByUsername = async (username: string) => {
    const { data } = await axios.get<IUser>('api/user', {
        params: {
            username
        }
    })

    return data
}

