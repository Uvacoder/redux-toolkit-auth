import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialLoginState = {
  isLoading: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
  },
});

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login;

export default loginSlice.reducer;
