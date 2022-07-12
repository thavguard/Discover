import { API } from "./../../API/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../../types/types";

type Data = {
  data: {
    username: string;
    token: string;
  };
};

type AuthData = {
  username: string;
  password: string;
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async ({ username, password }: AuthData) => {
    const { data }: Data = await API.post("auth/login", {
      username,
      password,
    });

    return data;
  }
);

type Auth = {
  username: string;
  token: string;
};

const initialState: Auth = {
  username: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    });
  },
});
