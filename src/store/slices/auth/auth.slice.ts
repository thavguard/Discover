import {API_URL, axios} from "../../../API/axios";
import axiosLib from "axios";

import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse, AuthSlice, IUser} from "./types";

const initialState: AuthSlice = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    isInitDone: false,
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },

        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setInitDone(state, action: PayloadAction<boolean>) {
            state.isInitDone = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const login =
    (email: string, password: string) => async (dispatch: Dispatch) => {
        try {
            const response = await axios.post<AuthResponse>("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.accessToken);
            dispatch(authSlice.actions.setUser(response.data.user));
            dispatch(authSlice.actions.setAuth(true));
        } catch (e: any) {
            console.log(e);
            dispatch(authSlice.actions.setError(e.response.data.message));
        } finally {
            dispatch(authSlice.actions.setInitDone(true));
        }
    };

export const registration =
    (formData: FormData) => async (dispatch: Dispatch) => {
        console.log(formData);

        try {
            const response = await axios.post<AuthResponse>(
                "/auth/registration",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"},
                }
            );
            localStorage.setItem("token", response.data.accessToken);
            dispatch(authSlice.actions.setUser(response.data.user));
            dispatch(authSlice.actions.setAuth(true));
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(authSlice.actions.setInitDone(true));
        }
    };

export const logout = () => async (dispatch: Dispatch) => {
    try {
        axios.post<void>("/auth/logout");

        localStorage.removeItem("token");
        dispatch(authSlice.actions.setAuth(false));
        dispatch(authSlice.actions.setUser({} as IUser));
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(authSlice.actions.setInitDone(true));
    }
};



export const checkAuth = () => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.setLoading(true));
    try {
        const response = await axiosLib.get<AuthResponse>(
            `${API_URL}/auth/refresh`,
            {withCredentials: true}
        );
        localStorage.setItem("token", response.data.accessToken);
        dispatch(authSlice.actions.setUser(response.data.user));
        dispatch(authSlice.actions.setAuth(true));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(authSlice.actions.setLoading(false));
        dispatch(authSlice.actions.setInitDone(true));
    }
};
