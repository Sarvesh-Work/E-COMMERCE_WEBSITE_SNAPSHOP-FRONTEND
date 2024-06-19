import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/Product/productSlice.jsx';
import userReducer from "../features/auth/authSlice.jsx";
import  AddToCartReducer from "../features/cart/cartSlice.jsx";
import orderReducer from "../features/order/orderSlice.jsx";
import userProfileReducer from "../features/user/userSlice.jsx";

export const store=configureStore({
    reducer:{
      product:productReducer,
      auth:userReducer,
      cart: AddToCartReducer,
      orders:orderReducer,
      user:userProfileReducer
    }
})