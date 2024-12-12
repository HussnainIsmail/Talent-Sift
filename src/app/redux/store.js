import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/authslice"

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
