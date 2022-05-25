import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/userSlice";
import Search from "./Search";
function Nav() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const distatch = useDispatch();


  
  return (
    <>
      <div className="annoncement">
        DUE TO A LARGE VOLUME OF REQUESTS, OUR SUPPORT TEAM MAY TAKE LONGER THAN
        NORMAL TO REPLY. WE APPRECIATE YOUR PATIENCE.
      </div>
      <div className="nav-bar">
        <div className="container">
          <div className="left">
            <Search />
          </div>
          <div className="center">
            <h1 className="hide">
              <Link to={"/"}>LTT Store</Link>
            </h1>
            <h1 className="show">
              <Link to={"/"}>LTT</Link>
            </h1>
          </div>
          <div className="right">
            {user === null ? (
              <div>
                <Link to={"/login"}>
                  <span className="login-link">Login</span>
                </Link>
              </div>
            ) : (
              <div className="showLogout">
                <Link to={"/profile"}>
                  <span className="login-link">{user.username}</span>
                </Link>
                <div className="logout" onClick={()=> distatch(logout())}>
                    <span className="login-link">Log out</span>
                </div>
              </div>
            )}
            <Link to={"/cart"}>
              <div className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>{quantity}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
