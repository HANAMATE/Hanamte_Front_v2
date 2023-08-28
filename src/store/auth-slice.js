import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loginId: "",
    name: "",
    balance: 0,
    userType: undefined,
    accessToken: "",
    refreshToken: "",
    accountBalance: "",
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.loginId = action.payload.loginId;
      state.name = action.payload.name;
      state.userType = action.payload.userType;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserId(state, action) {
      state.loginId = action.payload.loginId;
    },
    setBalance(state, action) {
      state.balance = action.payload.balance;
    },
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccountBalance(state, action) {
      state.accountBalance = action.payload.accountBalance;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginId = "";
      state.name = "";
      state.balance = 0;
      state.userType = undefined;
      state.accessToken = "";
      state.refreshToken = "";
      state.accountBalance = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
