import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchSettings = createAsyncThunk(
  "settings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/settings/get`);
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت تنظیمات.");
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/update",
  async (settingsData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/settings/update`,
        settingsData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ذخیره تنظیمات."
      );
    }
  }
);

const initialState = {
  settings: {
    rowsIndex: 9,
    commentsEnabled: true,
  },
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default settingsSlice.reducer;
