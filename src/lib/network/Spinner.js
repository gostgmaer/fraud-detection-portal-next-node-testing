import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 9999 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;
