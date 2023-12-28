import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close, Padding } from "@mui/icons-material";
import { useGlobalContext } from "@/context/globalContext";

export default function MuiModal({
  heading,
  Content,
  classes,
  maxWidth,
  openModal,
  setOpenModal,
}) {
  const [fullWidth, setFullWidth] = React.useState(true);

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      fullWidth={true}
      // @ts-ignore

      maxWidth={maxWidth ? maxWidth : "md"}
      className={`${classes ? classes : ""} overflow-hidden `}
      open={openModal ? true : false}
    >
    
      {heading ? (
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className={heading.classess}
        >
          { heading ? heading.title : "Modal Heading for web"}
        { heading.icon && <IconButton aria-label="close" onClick={() => setOpenModal(false)}>
            { heading.icon}
          </IconButton>}
        </DialogTitle>
      ) : (
        <div className="absolute " style={{ top: 10, right: 10 }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenModal(false)}
            className=" "
          >
            {heading ? heading.icon : <Close />}
          </IconButton>
        </div>
      )}

      <DialogContent
        sx={{
          width: "auto  ",
          height: "auto",
          padding: "0 !important",
        }}
        dividers
      >
        {Content ? Content : "No Data Found Found"}
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
