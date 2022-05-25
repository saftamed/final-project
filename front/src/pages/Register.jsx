import React from 'react'
import {Link } from "react-router-dom";
import { register } from '../store/userApi';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
function Register() {
   const dispatch = useDispatch();
   const updateForm = (e) => {
     setUser(
       {
         ...user,
         [e.target.name]: e.target.value
       }
     )
   }
   const [user, setUser] = React.useState({});
  return (
     <>
     <Loading/>
    <div className="login-con reg">
    <div>
        <h1>Register</h1>
        <div>
           <div>
              <label >UserName</label>
           </div>
            <input type="text" name="username" onChange={(e)=> updateForm(e)}/>
        </div>
        <div>
           <div>
              <label >Email</label>
           </div>
            <input type="email" name="email" onChange={(e)=> updateForm(e)}/>
        </div>
        <div>
           <div>
              <label >Password</label>
           </div>
            <input type="password" name="password" onChange={(e)=> updateForm(e)}/>
        </div>
        <div>
           <div>
              <label >Confirm Password</label>
           </div>
            <input type="password" name="cpassword" onChange={(e)=> updateForm(e)}/>
        </div>
        <div>
           <Link to={"/login"}>

            <span>Already have one? Login</span>
           </Link>
        </div>
        <button className="btn" onClick={() => register(dispatch,user)}>Register</button>
    </div>
</div>
</>
  )
}

export default Register