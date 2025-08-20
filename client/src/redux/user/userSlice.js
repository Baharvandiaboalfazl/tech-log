import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const signupUser = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/signup`, formData);
      return res.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        return rejectWithValue({
          type: "validation",
          errors: error.response.data.errors,
        });
      }
      return rejectWithValue({
        type: "general",
        message: error.response?.data?.title || "خطایی رخ داد.",
      });
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/signin`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/users/update/${userId}`,
        formData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/users/delete/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const signoutUser = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${apiUrl}/api/users/signout`);
      return;
    } catch (error) {
      return rejectWithValue("خطا در خروج از حساب.");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/users/getusers?${searchQuery}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در دریافت کاربران."
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/verify-email`, {
        email,
        otp,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/send-otp`, { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ارسال مجدد کد."
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/forgot-password`, {
        email,
      });
      return res.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        return rejectWithValue({
          type: "badReq",
          errors: error.response.data.errors,
        });
      }
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/auth/reset-password/${token}`,
        {
          password,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const fetchAuthorProfile = createAsyncThunk(
  "user/fetchAuthorProfile",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/users/author/${username}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "نویسنده یافت نشد."
      );
    }
  }
);

export const banUser = createAsyncThunk(
  "user/banUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${apiUrl}/api/users/ban/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در مسدود کردن کاربر."
      );
    }
  }
);

export const unbanUser = createAsyncThunk(
  "user/unbanUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${apiUrl}/api/users/unban/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در رفع مسدودیت."
      );
    }
  }
);

export const fetchChartData = createAsyncThunk(
  "user/fetchChartData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/users/chart-data`);
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت داده‌های نمودار.");
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, newRole }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${apiUrl}/api/users/change-role/${userId}`, {
        newRole,
      });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "خطایی در سرور رخ داد.";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  users: [],
  totalUsers: 0,
  lastMonthUsers: 0,
  currentUser: null,
  loading: false,
  error: null,
  chartData: {
    usersPerDay: [],
    postsPerMonth: [],
    postsByCategory: [],
  },
  viewedProfile: {
    data: null,
    loading: true,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    clearViewedProfile: (state) => {
      state.viewedProfile = { data: null, loading: true, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthorProfile.pending, (state) => {
        state.viewedProfile.loading = true;
        state.viewedProfile.error = null;
      })
      .addCase(fetchAuthorProfile.fulfilled, (state, action) => {
        state.viewedProfile.loading = false;
        state.viewedProfile.data = action.payload;
      })
      .addCase(fetchAuthorProfile.rejected, (state, action) => {
        state.viewedProfile.loading = false;
        state.viewedProfile.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.lastMonthUsers = action.payload.lastMonthUsers;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(banUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(banUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(unbanUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unbanUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, signoutSuccess, clearViewedProfile } =
  userSlice.actions;
export default userSlice.reducer;
