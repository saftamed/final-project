import React, { useState } from 'react'
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "../store/userApi";

function Login() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, user);
  }
  return (
    <div className='container2'>
      <div className="content2">
        <h1>Login</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3 },
          }}
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >

          <TextField
            label="Email"
            name="email"
            type={'email'}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="Password"
            name="password"
            type={'password'}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                color='default'
                onChange={(e) => setUser({ ...user, remember: e.target.checked })}
              />
            }
            label="Remember Me"
          />
          <button type="submit"  className='btn' >Login</button>
        </Box>
      </div>
    </div>
  )
}

export default Login