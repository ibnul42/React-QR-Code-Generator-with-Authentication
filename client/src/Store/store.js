import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Feature/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
