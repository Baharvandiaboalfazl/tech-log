import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const searchQuery = new URLSearchParams(params).toString();

      const res = await axios.get(
        `${apiUrl}/api/posts/getposts?${searchQuery}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/posts/getposts?postId=${postId}`
      );
      if (res.data.posts.length === 0) {
        return rejectWithValue("پست یافت نشد.");
      }
      return res.data.posts[0];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در دریافت پست."
      );
    }
  }
);

export const fetchRandomPosts = createAsyncThunk(
  "posts/fetchRandomPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/posts/getrandom`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.title);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/api/posts/deletepost/${postId}/${userId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title || "خطایی رخ داد.");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}/api/posts/create`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ایجاد پست."
      );
    }
  }
);

export const fetchMorePosts = createAsyncThunk(
  "posts/fetchMore",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/posts/getposts?${searchQuery}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت پست‌های بیشتر.");
    }
  }
);

export const fetchPostStats = createAsyncThunk(
  "posts/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/posts/stats`);
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت داده‌های نمودار.");
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ postId, userId, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/posts/updatepost/${postId}/${userId}`,
        formData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در به‌روزرسانی پست."
      );
    }
  }
);

const initialState = {
  posts: [],
  totalPosts: 0,
  lastMonthPosts: 0,
  stats: {
    postsPerMonth: [],
    postsByCategory: [],
  },
  currentPost: null,
  randomPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMorePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.posts];
      })
      .addCase(fetchMorePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.currentPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRandomPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.randomPosts = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { clearCurrentPost } = postSlice.actions;

export default postSlice.reducer;
