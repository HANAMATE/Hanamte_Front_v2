import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loginId: "",
    expiredAt: "",
    name: "",
    balance: 0,
    isParent: undefined,
    accessToken: "",
    refreshToken: "",
  },
  reducers: {
    login(state, action) {
      const authInformation = action.payload;
      state.isAuthenticated = true;
      state.loginId = authInformation.loginId;
      state.expiredAt = authInformation.expiredAt;
      state.name = authInformation.name;
      state.balance = authInformation.balance;
      state.isParent = authInformation.isParent;
      state.accessToken = authInformation.accessToken;
      state.refreshToken = authInformation.refreshToken;
    },
    setBalance(state, action) {
      state.balance = action.payload.balance;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.expiredAt = "";
      state.name = "";
      state.balance = 0;
      state.isParent = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
