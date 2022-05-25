import React from 'react'
import "../css/sideBar.css"
import { NavLink  } from "react-router-dom";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    Category,
    Storefront,
    AddBox,
    PeopleAlt,
    PersonAdd,
    Subscriptions,
    Comment,
    Report,
  } from "@material-ui/icons";
import { useSelector } from 'react-redux';


function SideBar() {
  const sliderShow = useSelector((state) => state.sliderShow);
  return (
      <div className="sidebar" style={{display:sliderShow?"block":"none"}} >
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3>Dashboard</h3>
          <ul>
            <NavLink  to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <li  >
              <LineStyle  />
              Home
            </li>
            </NavLink>
            <li >
              <Timeline />
              Analytics
            </li>
            <NavLink  to="/sales" className={({ isActive }) => (isActive ? "active" : "")}>

            <li >
              <TrendingUp />
              Sales
            </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 >Products</h3>
          <ul >
            <NavLink  to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
              <li >
                <Category  />
                Products
              </li>
            </NavLink>
            <NavLink  to="/product/add" className={({ isActive }) => (isActive ? "active" : "")}>
              <li >
                <AddBox  />
                Add Product
              </li>
            </NavLink>
           
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 >Users</h3>
          <ul >
          <NavLink  to="/users" className={({ isActive }) => (isActive ? "active" : "")} >
              <li >
                <PeopleAlt  />
                All Users
              </li>
            </NavLink>
            <NavLink  to="/user/add" className={({ isActive }) => (isActive ? "active" : "")} >
              <li >
                <PersonAdd  />
                Add User
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 >News Letter</h3>
          <ul>
          <NavLink  to="/news" className={({ isActive }) => (isActive ? "active" : "")} >
              <li >
                <Subscriptions  />
                Show Subscribers
              </li>
            </NavLink>
          <NavLink  to="/comments" className={({ isActive }) => (isActive ? "active" : "")} >
              <li >
                <Comment  />
                New Comments
              </li>
            </NavLink>

            <li >
              <Report />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar