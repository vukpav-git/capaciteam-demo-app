import { configureStore } from "@reduxjs/toolkit";

import billReducer from "./reducers/billReducer";

const store = configureStore({
  reducer: billReducer,
});

export default store;
