import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import emailReducer from "./email/emailSlice.js";
import filterReducer from "./features/auth/filterSlice.js";

// Check local storage for user data
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : "null";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
  },
  preloadedState: {
    auth: {
      user: parsedUser,
      // ... other auth state properties
    },
  },
});
