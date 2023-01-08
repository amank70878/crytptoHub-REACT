import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currencyReduxState: "inr",
};

export const currencyReducer = createReducer(initialState, {
  currencyType: (state, action) => {
    state.currencyReduxState = action.payload;
  },
});
