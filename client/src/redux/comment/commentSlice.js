import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAll",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/comments/getcomments?${searchQuery}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("خطا در دریافت دیدگاه‌ها.");
    }
  }
);

export const fetchCommentsByPost = createAsyncThunk(
  "comments/fetchByPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/comments/getPostComments/${postId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در دریافت دیدگاه‌ها."
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/comments/create`,
        commentData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ارسال دیدگاه."
      );
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/comments/likeComment/${commentId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در لایک کردن."
      );
    }
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/comments/editComment/${commentId}`,
        {
          content,
        }
      );
      toast.success("دیدگاه با موفقیت ویرایش شد.");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در ویرایش دیدگاه."
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/api/comments/deleteComment/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.title || "خطا در حذف دیدگاه."
      );
    }
  }
);

export const fetchCommentByNum = createAsyncThunk(
  "comments/fetchCommentByNum",
  async (size, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/comments/getCommentByNum?size=${size}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.title);
    }
  }
);

const initialState = {
  allComments: [],
  commentByNum: [],
  postComments: [],
  totalComments: 0,
  lastMonthComments: 0,
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.postComments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postComments = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload.comments;
        state.totalComments = action.payload.totalComments;
        state.lastMonthComments = action.payload.lastMonthComments;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.allComments.unshift(action.payload);
        state.postComments.unshift(action.payload);
      })

      .addCase(likeComment.fulfilled, (state, action) => {
        state.allComments = state.allComments.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        state.postComments = state.postComments.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })

      .addCase(editComment.fulfilled, (state, action) => {
        state.postComments = state.postComments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.postComments = state.postComments.filter(
          (comment) =>
            comment._id !== action.payload &&
            comment.parentId !== action.payload
        );
      })
      .addCase(fetchCommentByNum.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.commentByNum = action.payload;
      })
      .addCase(fetchCommentByNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
