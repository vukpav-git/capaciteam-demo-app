import { configureStore } from "@reduxjs/toolkit";

import billReducer from "./features/billSlice";

const store = configureStore({
  reducer: billReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
