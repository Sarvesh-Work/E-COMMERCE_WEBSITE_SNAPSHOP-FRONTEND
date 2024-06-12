import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createProducts,
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProductsByFilter,

  fetchProductById,
  fetchRecentlyViewed,
  updateProduct,
} from "./productAPI";

const initialState = {
  product: [],
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct: null,
  status: "idle",
};

export const createProductsAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProducts(product);
    return response;
  }
);


export const updateProductsAsync = createAsyncThunk(
  "product/update",
  async (product) => {
    const response = await updateProduct(product);
    return response;
  }
);

export const fetchProductsByAsync = createAsyncThunk(
  "product/fetchAllProductsByFilter",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchAllProductsByFilter(
      filter,
      sort,
      pagination,
      admin
    );
    return response.data;
  }
);



export const fetchBrandsByAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();

    return response.data;
  }
);

export const recentlyViewedAsync = createAsyncThunk(
  "product/recentlyViewed",
  async () => {
    const response = await fetchRecentlyViewed()
    return response;
  }
);

export const fetchCategoriesByAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();

    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);

    return response.data;
  }
);



export const productSlice = createSlice({
  name: "product",

  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product.push(action.payload);
      })
      .addCase(fetchProductsByAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsByAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsByAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesByAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesByAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.selectedProduct.findIndex(
          (product) => product.id === action.payload.id
        );
        state.selectedProduct[index] = action.payload;
      })


  },
});

export const selectAllProduct = (state) => state.product.product;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectRecentlyViewed = (state) => state.product.RecentlyViewedProduct
export default productSlice.reducer;
