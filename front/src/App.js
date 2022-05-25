/* eslint-disable jsx-a11y/alt-text */
import Cart from "./pages/Cart";
import CategorieProduit from "./pages/CategorieProduit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProduitDet from "./pages/ProduitDet";
import Register from "./pages/Register";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import Profile from "./pages/Profile";
import Notification from "./components/Notification";
import CheckOut from "./pages/CheckOut";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Order from "./pages/Order";
// import "../node_modules/react-animate-on-scroll/dist/scrollAnimation.min.css";
// // import "animate.css/animate.min.css";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
    <Notification />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user===null?<Login />:<Navigate replace  to="/"/>} />
      <Route path="/register" element={user===null?<Register />:<Navigate replace  to="/"/>} />
      <Route path="/profile" element={user!==null?<Profile />:<Navigate replace  to="/login"/>} />
      <Route path="/checkout" element={user!==null?<CheckOut />:<Navigate replace  to="/login"/>} />
      <Route path="/success/:id" element={user!==null?<Success />:<Navigate replace  to="/login"/>} />
      <Route path="/order/:id" element={user!==null?<Order />:<Navigate replace  to="/login"/>} />
      <Route path="/cancel" element={user!==null?<Cancel />:<Navigate replace  to="/login"/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/produit/:id" element={<ProduitDet />} />
      <Route path="/produits/:cat" element={<CategorieProduit />} />
    </Routes>
    </>
  );
}

export default App;
