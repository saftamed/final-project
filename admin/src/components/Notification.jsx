import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/userSlice";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function Notification() {
  const notif = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notif?.show) {
      setTimeout(() => {
        dispatch(setNotification({ ...notif, show: false }));
      }, 3000);
    }
  }, [notif]);

  return notif.type !== null && (
    <div
      id="notif"
      className="visible"
      style={{
        transform: notif.show? "translateX(-340px)":""
      }}
    >
      <Alert severity={notif.type}>
        <AlertTitle>{notif.type}</AlertTitle>
        {notif.message}
      </Alert>
    </div>
  );
}

export default Notification;
