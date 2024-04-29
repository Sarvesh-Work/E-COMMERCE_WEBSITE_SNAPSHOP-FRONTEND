import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import {  checkUser, createUser } from "./AuthAPI";

const initialState = {
  users: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);

    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo,{rejectWithValue}) => {
  try {
    const response = await checkUser(loginInfo);

    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
  }
);

// export const UpdateAddressAsync = createAsyncThunk(
//   "user/UpdateAddAddress",
//   async (update) => {

//       const response = await UpdateAddAddress(update);

//     return response.data;
   
//   }
// );

export const authSlice = createSlice({
  name: "Auth",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // .addCase(UpdateAddressAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(UpdateAddressAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.users = action.payload;
      // });
  },
});

export const selectLoggedUser = (state) => state.auth.users;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
