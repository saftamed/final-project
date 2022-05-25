import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    sliderShow:true,
    notification:{
      message: null,
      show: false,
      type: null
    },
    products: [],
    users: [],
    error: false,
    notification:{
      show: false,
      message: "",
      type: ""

    }
  },
  reducers: {
    toggleSlider: (state) => {
      state.sliderShow = !state.sliderShow;
    },
    startReq: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      if(action.payload.user.isAdmin){

      state.currentUser = action.payload.user;
      state.notification = {
        message: action.payload.msg,
        show: true,
        type: "success",
      };
    }else{
      state.currentUser = null;
      state.notification = {
        message: "User is not admin",
        show: true,
        type: "error",
      };
    }
    },
    reqSuccess: (state,action) => {
      state.isFetching = false;
      state.notification = {
        message: action.payload?action.payload :"Subscribed Successfully",
        show: true,
        type: "success",
      };
    },
    reqProSuccess: (state,action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    reqUsersSuccess: (state,action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    reqFailure: (state,action) => {
      state.isFetching = false;
      state.error = true;
      state.notification = {
        message: action.payload?action.payload :"Login failed",
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
    },
    setFetchingFalse: (state) => {
      state.isFetching = false;
    },
    proDelSuccess:(state,action)=>{
      state.products = state.products.filter(product=>product._id !== action.payload);
      state.isFetching = false;
      state.notification = {
        message: "product deleted",
        show: true,
        type: "success",
      };
    },
    userDelSuccess:(state,action)=>{
      state.users = state.users.filter(user=>user._id !== action.payload);
      state.isFetching = false;
      state.notification = {
        message: "user deleted",
        show: true,
        type: "success",
      };
    }
  },
});

export const { startReq, toggleSlider,loginSuccess,userDelSuccess,proDelSuccess,reqUsersSuccess,setFetchingFalse, reqSuccess,logout,reqProSuccess,setNotification,reqFailure} = userSlice.actions;
export default userSlice.reducer;