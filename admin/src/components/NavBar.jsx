import { NotificationsNone, Settings, ExitToApp,Menu } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Button } from "@mui/material";

import "../css/nav.css";
import { logout, toggleSlider } from "../store/userSlice";

function NavBar() {
  const user = useSelector((state) => state.currentUser);
 const dispatch = useDispatch();
  return (
    <div className="nav">
      <div className="left">
        <div className="logo">
            <IconButton aria-label="delete" size="large" onClick={() => dispatch(toggleSlider())} >
              <Menu fontSize="inherit" />
            </IconButton>
          <h1>
            LTT Store</h1>
        </div>
      </div>
      <div className="right">
        <div className="nav-item">
          <span>{user.username}</span>

          <IconButton aria-label="delete" size="large">
            <Settings />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <NotificationsNone />
          </IconButton>
          <IconButton aria-label="delete" size="large" onClick={()=>dispatch(logout())} >
            <ExitToApp />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
