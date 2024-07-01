import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/projects/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatSlice
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
