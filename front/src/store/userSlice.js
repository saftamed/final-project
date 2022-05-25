import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    notification:{
      message: null,
      show: false,
      type: null
    },
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.notification = {
        message: action.payload.msg,
        show: true,
        type: "success",
      };
    },
    reqSuccess: (state,action) => {
      state.isFetching = false;
      state.notification = {
        message: action.payload?action.payload :"Subscribed Successfully",
        show: true,
        type: "success",
      };
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.notification = {
        message: "Login failed",
        show: true,
        type: "error",
      };
    },
    logout: (state) => {
      state.currentUser = null;
      state.notification = {
        message: "Logged out",
        show: true,
        type: "success",
      };
    },setNotification: (state, action) => {
      state.notification = action.payload;
    }
    ,setLoading: (state, action) => {
      state.isFetching = action.payload;
    },
    },
});

export const { loginStart, loginSuccess,setLoading, loginFailure,logout,reqSuccess,setNotification} = userSlice.actions;
export default userSlice.reducer;