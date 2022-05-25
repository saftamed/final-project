import React from 'react'
import {Link } from "react-router-dom";
import { login } from '../store/userApi';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
function Login() {
  const dispatch = useDispatch();
  const updateForm = (e) => {
    setUser(
      {
        ...user,
        [e.target.name]: e.target.value
      }
    )
  }
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });
  return (
    <>
      <Loading/>
    <div className="login-con">
    <div>
        <h1>Login</h1>
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
        <div className="flex">
            <input type="checkbox" name="" />
            <label >Remembre Me</label>
        </div>
        <div>
          <Link to={"/register"}>
          
          <span>Dont have a Account Register Now</span>
          </Link>
      </div>
        <button className="btn" onClick={() => login(dispatch,user)}> Login</button>
    </div>
</div>
</>
  )
}

export default Login