import React from "react";
import {
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiDialogTitle from "@mui/material/DialogTitle";

const styles = (theme) => ({
  dialogContainer: {
    borderRadius: theme.spacing(2),
  },
});

const useStyles = makeStyles(styles);

export default function WrongNetwork(props) {
  const classes = useStyles();
  const { open } = props;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialogContainer }}
    >
      <MuiDialogTitle>Unsupported Network</MuiDialogTitle>
    </Dialog>
  );
}
