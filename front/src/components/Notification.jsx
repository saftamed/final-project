import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/userSlice";

function Notification() {
  const notif = useSelector((state) => state.user.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notif.show) {
      setTimeout(() => {
        dispatch(setNotification({ ...notif, show: false }));
      }, 3000);
    }
  }, [notif]);

  return (
    <div
      id="notif"
      className="visible"
      style={{
        transform: notif.show ? "translateX(-340px)" : "",
        backgroundColor: notif.type === "success" ? "#4bb543" : "#fb3c3c",
      }}
    >
      {notif.message}
    </div>
  );
}

export default Notification;
