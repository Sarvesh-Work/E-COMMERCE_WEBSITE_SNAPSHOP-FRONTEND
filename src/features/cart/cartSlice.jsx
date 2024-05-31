import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateItem,
  AddItemsToCart,
  DeleteItem,
  ResetCart,
  FetchAllProducts,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const AddItemsAsync = createAsyncThunk(
  "items/AddItemsToCart",
  async (items) => {
    const response = await AddItemsToCart(items);
    return response.data;
  }
);

export const FetchProductsByuserIdAsync = createAsyncThunk(
  "items/fetchAllProductsByUserId",
  async () => {
    const response = await FetchAllProducts();
    return response.data;
  }
);

export const UpdateItemAsync = createAsyncThunk(
  "items/UpdateItem",
  async (update) => {
    const response = await UpdateItem(update);
    return response.data;
  }
);

export const DeleteItemFromCartAsync = createAsyncThunk(
  "items/DeleteItem",
  async (itemId) => {
    const response = await DeleteItem(itemId);
    return response.data;
  }
);

export const ResetCartAsync = createAsyncThunk("items/ResetCart", async () => {
  const response = await ResetCart();
  return response.data;
});

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(FetchProductsByuserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchProductsByuserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(UpdateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(DeleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(ResetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ResetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const SelectCartItems = (state) => state.cart.items;
export const SelectCartStatus = (state) => state.status;
export default CartSlice.reducer;
