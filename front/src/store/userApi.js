import { loginFailure, loginStart, loginSuccess,reqSuccess } from "./userSlice";
import axios from "axios";
import {store} from "./store";

export const login = async (dispatch, user) => {
    console.log(user);
  dispatch(loginStart());
  try {
    const res = await axios.post("https://store-ltt.herokuapp.com/api/v1/auth/login", user);
    dispatch(loginSuccess({...res.data,msg:"Login Successful"}));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user) => {
    console.log(user);
  dispatch(loginStart());
  try {
    const res = await axios.post("https://store-ltt.herokuapp.com/api/v1/auth/register", user);
    dispatch(loginSuccess({...res.data,msg:"Registered Successfully"}));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const updateUser = async (dispatch, info) => {
  dispatch(loginStart());
  axios.defaults.headers.common['token'] = `Bearer ${info.theuser.accessToken }`;

  try {
    const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/user/${info.theuser._id}`, info.user);
    dispatch(loginSuccess({...res.data, accessToken: info.theuser.accessToken,msg:"User Updated Successfully"}));
  } catch (err) {
    dispatch(loginFailure());
  }
};


export const addAddress = async (dispatch, info) => {
  dispatch(loginStart());
  axios.defaults.headers.common['token'] = `Bearer ${info.theuser.accessToken }`;

  try {
    const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/user/address/${info.theuser._id}`, {adr:info.adr});
    dispatch(loginSuccess({...res.data, accessToken: info.theuser.accessToken,msg:"Address added successfully"}));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const subscribe = async (dispatch, email) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/news`, {email});
    dispatch(reqSuccess());
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const addComment = async (dispatch, cmnt) => {
  dispatch(loginStart());
  try {
    axios.defaults.headers.common['token'] = `Bearer ${ store.getState().user.currentUser.accessToken }`;
    const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/comments`, cmnt);
    dispatch(reqSuccess("Comment added !"));
  } catch (err) {
    dispatch(loginFailure());
  }
  console.log(store.getState());
};

