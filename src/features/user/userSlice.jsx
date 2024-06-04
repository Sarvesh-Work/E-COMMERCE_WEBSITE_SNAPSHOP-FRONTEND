import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserInfo,
  fetchLogInUser,
  fetchOrders,
  updateUser,
} from "./userAPI";

const initialState = {
  status: "idle",
  userInfo: null,
};

export const getAllOrdersAsync = createAsyncThunk(
  "User/fetchOrdersByUser",
  async () => {
    const response = await fetchOrders();
    return response.data;
  }
);

export const fetchLogInUserInfoAsync = createAsyncThunk(
  "User/fetchLogInUser",
  async () => {
    const response = await fetchLogInUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "User/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
  }
);

export const deleteUserInfoAsync = createAsyncThunk(
  "User/deleteUserInfo",
  async () => {
    const response = await deleteUserInfo();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    increment: () => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo.orders = action.payload;
      })
      .addCase(fetchLogInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(deleteUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserInfoAsync.fulfilled, (state) => {
        state.status = "idle";
        state.userInfo = null;
      });
  },
});

export const selectAllOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
