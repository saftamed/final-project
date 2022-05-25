/* eslint-disable jsx-a11y/alt-text */

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import Notification from "./components/Notification";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Loading from "./components/Loading";
import Users from "./pages/Users";
import User from "./pages/User";
import NewsSub from "./pages/NewsSub";
import Comments from "./pages/Comments";
import Sales from "./pages/Sales";

// import "../node_modules/react-animate-on-scroll/dist/scrollAnimation.min.css";
// // import "animate.css/animate.min.css";
function App() {
  const user = useSelector((state) => state.currentUser);
  return (
    <>
      <Notification />
      <Loading />
      <Routes>
        <Route path="/" element={user!==null?<Layout />:<Navigate replace  to="/login"/>} >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/news" element={<NewsSub />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/sales" element={<Sales />} />
        </Route>
        <Route path="/login" element={user===null?<Login />:<Navigate replace  to="/"/>} />
      </Routes>
    </>
  );
}

export default App;
