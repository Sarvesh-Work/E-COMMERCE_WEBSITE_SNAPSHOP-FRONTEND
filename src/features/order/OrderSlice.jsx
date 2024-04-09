import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddOrders } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder:null
};

export const orderItemsAsync = createAsyncThunk(
  "order/AddOrders",
  async (order) => {
    const response = await AddOrders(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder:(state)=>{
      state.currentOrder=null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push[action.payload];
        state.currentOrder=action.payload
      });
  },
});

 export const {resetCurrentOrder}=orderSlice.actions

 export const selectCurrentOrder=(state)=>state.orders.currentOrder

export default orderSlice.reducer;
