import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/ProductSlice"
import userReducer from "../features/auth/AuthSlice";
import  AddToCartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userProfileReducer from "../features/user/userSlice";

export const store=configureStore({
    reducer:{
      product:productReducer,
      auth:userReducer,
      cart: AddToCartReducer,
      orders:orderReducer,
      user:userProfileReducer
    }
})