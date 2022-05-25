import { reqProSuccess,userDelSuccess, reqSuccess,proDelSuccess,reqUsersSuccess, reqFailure,startReq,loginSuccess } from "./userSlice";
import axios from "axios";
import {store} from "./store";



export const getProducts = async (dispatch) => {

  dispatch(startReq());
  try {
    const res = await axios.get("https://store-ltt.herokuapp.com/api/v1/product");
    dispatch(reqProSuccess(res.data));
  } catch (err) {
    dispatch(reqFailure("Error cannot get data"));
  }
};
export const getUsers = async (dispatch) => {

  dispatch(startReq());
  try {
    const res = await axios.get("https://store-ltt.herokuapp.com/api/v1/user");
    dispatch(reqUsersSuccess(res.data));
  } catch (err) {
    dispatch(reqFailure("Error cannot get data"));
  }
};

export const updateProduct = async (dispatch,data) => {
  console.log(data);
  dispatch(startReq());
  try {
    const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/product/${data.id}`,data.formData);
    dispatch(reqSuccess("Product updated"));
  } catch (err) {
    dispatch(reqFailure("Error cannot update data"));
  }
};


export const cmntVerif = async (dispatch,id) => {
  dispatch(startReq());
  try {
    const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/comments/verify/${id}`);
    dispatch(reqSuccess("Comment verified"));
  } catch (err) {
    dispatch(reqFailure("Error cannot verify comment"));
  }
};
export const cmntDelete = async (dispatch,id) => {
  dispatch(startReq());
  try {
    const res = await axios.delete(`https://store-ltt.herokuapp.com/api/v1/comments/${id}`);
    dispatch(reqSuccess("Comment deleted"));
  } catch (err) {
    dispatch(reqFailure("Error cannot delete comment"));
  }
};
export const proDelete = async (dispatch,id) => {
  dispatch(startReq());
  try {
    const res = await axios.delete(`https://store-ltt.herokuapp.com/api/v1/product/${id}`);
    dispatch(proDelSuccess(id));
  } catch (err) {
    dispatch(reqFailure("Error cannot delete product"));
  }
};
export const deleteUser = async (dispatch,id) => {
  dispatch(startReq());
  try {
    const res = await axios.delete(`https://store-ltt.herokuapp.com/api/v1/user/${id}`);
    dispatch(userDelSuccess(id));
  } catch (err) {
    dispatch(reqFailure("Error cannot delete User"));
  }
};

export const addProduct = async (dispatch,formData) => {
  dispatch(startReq());
  try {
    const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/product`,formData);
    dispatch(reqSuccess("Product created"));
  } catch (err) {
    dispatch(reqFailure("Error cannot create Product"));
  }
};



export const updateUser = async (dispatch,data) => {
  console.log(data);
  dispatch(startReq());
  try {
    const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/user/${data.id}`,data.user);
    dispatch(reqSuccess("User updated"));
  } catch (err) {
    dispatch(reqFailure("Error cannot update User"));
  }
};
export const addUser = async (dispatch,data) => {
  dispatch(startReq());
  try {
    const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/user`,data);
    dispatch(reqSuccess("User created"));
  } catch (err) {
    dispatch(reqFailure("Error cannot create User"));
  }
};




export const login = async (dispatch, user) => {
    console.log(user);
  dispatch(startReq());
  try {
    const res = await axios.post("https://store-ltt.herokuapp.com/api/v1/auth/login", user);
    dispatch(loginSuccess({user:res.data,msg:"Login Successful"}));
  } catch (err) {
    dispatch(reqFailure("Email or password is incorrect"));
  }
};
// export const register = async (dispatch, user) => {
//     console.log(user);
//   dispatch(loginStart());
//   try {
//     const res = await axios.post("https://store-ltt.herokuapp.com/api/v1/auth/register", user);
//     dispatch(loginSuccess({...res.data,msg:"Registered Successfully"}));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

// export const updateUser = async (dispatch, info) => {
//   dispatch(loginStart());
//   axios.defaults.headers.common['token'] = `Bearer ${info.theuser.accessToken }`;

//   try {
//     const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/user/${info.theuser._id}`, info.user);
//     dispatch(loginSuccess({...res.data, accessToken: info.theuser.accessToken,msg:"User Updated Successfully"}));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };


// export const addAddress = async (dispatch, info) => {
//   dispatch(loginStart());
//   axios.defaults.headers.common['token'] = `Bearer ${info.theuser.accessToken }`;

//   try {
//     const res = await axios.put(`https://store-ltt.herokuapp.com/api/v1/user/address/${info.theuser._id}`, {adr:info.adr});
//     dispatch(loginSuccess({...res.data, accessToken: info.theuser.accessToken,msg:"Address added successfully"}));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };

// export const subscribe = async (dispatch, email) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/news`, {email});
//     dispatch(reqSuccess());
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };
// export const addComment = async (dispatch, cmnt) => {
//   dispatch(loginStart());
//   try {
//     axios.defaults.headers.common['token'] = `Bearer ${ store.getState().user.currentUser.accessToken }`;
//     const res = await axios.post(`https://store-ltt.herokuapp.com/api/v1/comments`, cmnt);
//     dispatch(reqSuccess("Comment added !"));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
//   console.log(store.getState());
// };

// export const getProducts = async (dispatch) => {
//   dispatch(getProductStart());
//   try {
//     const res = await publicRequest.get("/products");
//     dispatch(getProductSuccess(res.data));
//   } catch (err) {
//     dispatch(getProductFailure());
//   }
// };