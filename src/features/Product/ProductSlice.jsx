import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchAllProductsByFilter, fetchProductById } from './ProductAPI';

const initialState = {
  product:[],
  brands:[],
  categories:[],
  totalItems:0,
  selectedProduct:null,
  status: 'idle',
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();

    return response;
  }
);


export const fetchProductsByAsync = createAsyncThunk(
  'product/fetchAllProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchAllProductsByFilter(filter,sort,pagination);

    return response.data;
  }
);

export const fetchBrandsByAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();

    return response.data;
  }
);

export const fetchCategoriesByAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();

    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);

    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  
  initialState,
  reducers:{

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
      })
      .addCase(fetchProductsByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchBrandsByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesByAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesByAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
    
        state.status = 'loading';
   
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      });
  },
});



export const SelectAllProduct=(state)=>state.product.product
export const SelectTotalItems=(state)=>state.product.totalItems
export const SelectBrands=(state)=>state.product.brands
export const SelectCategories=(state)=>state.product.categories
export const SelectProductById=(state)=>state.product.selectedProduct
export const SelectProductListStatus=(state)=>state.product.status

export default productSlice.reducer;