import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const LoadingScreen = () => {
  const [open, setOpen] = useState(true);
  const fetchCount = useSelector((state: RootState) => state.app.fetchCount);
  useEffect(() => {
    if (fetchCount > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [fetchCount]);
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingScreen;
