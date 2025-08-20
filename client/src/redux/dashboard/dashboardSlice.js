import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "profile",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
