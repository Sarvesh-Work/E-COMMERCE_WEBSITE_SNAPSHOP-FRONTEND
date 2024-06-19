import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice.js"
import userReducer from "../features/auth/authSlice.js";
import  AddToCartReducer from "../features/cart/cartSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import userProfileReducer from "../features/user/userSlice.js";

export const store=configureStore({
    reducer:{
      product:productReducer,
      auth:userReducer,
      cart: AddToCartReducer,
      orders:orderReducer,
      user:userProfileReducer
    }
})