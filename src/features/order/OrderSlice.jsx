import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddOrders, UpdateOrder, fetchAllOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};

export const orderItemsAsync = createAsyncThunk(
  "order/AddOrders",
  async (order) => {
    const response = await AddOrders(order);
    return response.data;
  }
);

export const UpdateOrderAsync = createAsyncThunk(
  "order/UpdateOrder",
  async (order) => {
    const response = await UpdateOrder(order);
    return response.data;
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  "order/fetchAllOrder",
  async () => {
    const response = await fetchAllOrder();
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.order;
        state.totalOrders = action.payload.totalOrder;
      })
      .addCase(UpdateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.orders.findIndex((order)=>order.id===action.payload.id)
        state.orders[index]=action.payload
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectAllOrders = (state) => state.orders.orders;
export const selectTotalOrders = (state) => state.orders.totalOrders;

export default orderSlice.reducer;
