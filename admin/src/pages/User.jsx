import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AddCircleOutline, Send, DeleteForever } from "@material-ui/icons";
import { IconButton, Button } from "@mui/material";

import { useDispatch } from "react-redux";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@material-ui/core";
import { addUser, updateUser } from "../store/userApi";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const addAddress = () => {
    let u = {...user};
    u.address.push({
      street: "",
      city: "",
      zip: "",
    });
    setUser(u);
  };
  const deleteAddress = (index) => {
    let u = {...user};
    u.address.splice(index, 1);
    setUser(u);
  };
  const changeAddress = (e, i) => {
    let u = { ...user };
    u.address[i] = { ...u.address[i], [e.target.name]: e.target.value };
    setUser(u);
  };
  const Gouv = [
    "Monastir",
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if(id === "add"){
      addUser(dispatch, user);
    }else{
      updateUser(dispatch, {user, id});
    }
  };
  useEffect(() => {
    if (id === "add") {
      setUser({
        username: "New User",
        email: "",
        password: "",
        isAdmin: false,
        address: [],
      });
    } else {
      axios
        .get(`https://store-ltt.herokuapp.com/api/v1/user/find/${id}`)
        .then((response) => {
          console.log(response.data);
          setUser({
            ...response.data,
            opassword: "",
            npassword: "",
            cpassword: "",
          });
        });
    }
  }, [id]);
  return (
    user && (
      <>
        <h1>{user.username}</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3 },
          }}
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="product-info user-info">
            <div className="right">
              <h2>User Info</h2>
              <div className="info">

              <TextField
                label="Username"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              {id !== "add" && (
                <TextField
                  label="Old Password"
                  name="password"
                  value={user.opassword}
                  onChange={(e) =>
                    setUser({ ...user, opassword: e.target.value })
                  }
                />
              )}

              <TextField
                label="New Password"
                name="password"
                value={user.npassword}
                onChange={(e) =>
                  setUser({ ...user, npassword: e.target.value })
                }
              />
              <TextField
                label="Confirm Password"
                name="password"
                value={user.cpassword}
                onChange={(e) =>
                  setUser({ ...user, cpassword: e.target.value })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAdmin"
                    checked={user.isAdmin}
                    onChange={(e) =>
                      setUser({ ...user, isAdmin: e.target.checked })
                    }
                    color="default"
                  />
                }
                label="Admin"
                value="start"
              />
              <Button variant="contained" type="submit" className="btn" endIcon={<Send />}>
                Save
              </Button>
              </div>
            </div>
            <div className="right" style={{ flex: 2 }}>
              <h2>
                Addresses
                <IconButton aria-label="delete" size="large" onClick={addAddress} >
                  <AddCircleOutline />
                </IconButton>
              </h2>
              {user.address.map((address, i) => (
                <div key={i}>
                  <h4>Address n {i + 1}</h4>
                  <div className="user-address">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="City"
                      name="city"
                      value={user.address[i].city}
                      onChange={(e) => {
                        changeAddress(e, i);
                      }}
                      helperText="Please select your city"
                    >
                      {Gouv.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Street"
                      name="street"
                      value={user.address[i].street}
                      onChange={(e) => changeAddress(e, i)}
                    />
                    <TextField
                      label="Zip Code"
                      name="zip"
                      value={user.address[i].zip}
                      onChange={(e) => changeAddress(e, i)}
                    />

                    <IconButton aria-label="delete" size="large" onClick={(e) => deleteAddress(i)}>
                      <DeleteForever />
                    </IconButton>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </Box>
      </>
    )
  );
}

export default User;
