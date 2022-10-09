import { AuthSlice } from "./../../types/IAuthSlice";
import { IUser } from "./../../types/IUser";
import { AuthResponse } from "./../../types/response/AuthResponse";
import { API_URL, axios } from "./../../API/axios";
import axiosLib from "axios";

import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSlice = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
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
      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setUser(response.data.user));
    } catch (e) {
      console.log(e);
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setUser(response.data.user));
    } catch (e) {
      console.log(e);
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
  }
};

export const checkAuth = () => async (dispatch: Dispatch) => {
  dispatch(authSlice.actions.setLoading(true));
  try {
    const response = await axiosLib.get<AuthResponse>(
      `${API_URL}/auth/refresh`,
      { withCredentials: true }
    );
    localStorage.setItem("token", response.data.accessToken);
    dispatch(authSlice.actions.setAuth(true));
    dispatch(authSlice.actions.setUser(response.data.user));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(authSlice.actions.setLoading(false));
  }
};
