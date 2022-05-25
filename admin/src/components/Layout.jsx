import React from 'react'
import { Outlet } from 'react-router';
import NavBar from "./NavBar";
import SideBar from "./SideBar";
function Layout() {
    console.log("ok");
  return (
    <div>
      <NavBar />
      <div className="container">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout