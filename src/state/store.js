import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./currencyReducer";

const store = configureStore({
  reducer: {
    currencyStore: currencyReducer,
  },
});

export default store;
