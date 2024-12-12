import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      state.permissions = [];
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
