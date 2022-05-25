import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setFetchingFalse } from "../store/userSlice";

function Loading() {
  const fetching = useSelector((state) => state.isFetching);
  const dispatch =useDispatch();
  useEffect(() => {
    if (fetching) {
      dispatch(setFetchingFalse());
    }
  }, []);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={fetching}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
