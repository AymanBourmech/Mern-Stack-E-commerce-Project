import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AjoutCategorie from "../Categories/AjoutCategorie";
import ModifCategorie from "../Categories/ModifCategorie";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 450,
  maxHeight: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "#000",
  borderRadius: "20px",
  padding: "16px 30px 70px",
};
export default function ModalCategorie(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "right" }}>
            <span style={{ cursor: "pointer" }} onClick={props.handleClose}>
              <CancelRoundedIcon style={{ fontSize: "40px" }} />
            </span>
          </div>
          <Typography>
            {props._id ? (
              <ModifCategorie _id={props._id} handleClose={props.handleClose} />
            ) : (
              <AjoutCategorie handleClose={props.handleClose} />
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
