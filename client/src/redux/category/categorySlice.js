import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(
        `${apiUrl}/api/categories/getcategories?${query}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت دسته‌بندی‌ها.");
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ name }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/categories/create`, { name });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ایجاد دسته‌بندی."
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/api/categories/delete/${categoryId}`
      );
      return categoryId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در حذف دسته‌بندی."
      );
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.unshift(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
