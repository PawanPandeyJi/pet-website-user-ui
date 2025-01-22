import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/auth-api";
import authReducer from "./feature/auth/authSlice";
import { petApi } from "./api/pet-api";
import { doctorApi } from "./api/doctor-api";
import { chatApi } from "./api/chat.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(petApi.middleware)
      .concat(doctorApi.middleware)
      .concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
