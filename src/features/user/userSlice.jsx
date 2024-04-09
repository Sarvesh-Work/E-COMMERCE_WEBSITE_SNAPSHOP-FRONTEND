import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogInUser, fetchOrdersByUserId, updateUser } from "./userAPI";

const initialState = {
  orders: null,
  status: "idle",
  userInfo: null,
};

export const getAllOrdersAsync = createAsyncThunk(
  "User/fetchOrdersByUserId",
  async (amount) => {
    const response = await fetchOrdersByUserId(amount);

    return response.data;
  }
);

export const fetchLogInUserInfoAsync = createAsyncThunk(
  "User/fetchLogInUser",
  async (amount) => {
    const response = await fetchLogInUser(amount);

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
        state.orders = action.payload;
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
      });
  },
});

export const selectAllOrders = (state) => state.user.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
