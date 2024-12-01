// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import todoReducer from './slices/todoSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});
