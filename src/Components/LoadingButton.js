import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import green from "@mui/material/colors/green";
import red from "@mui/material/colors/red";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: 0,
    position: "relative",
  },
  progress: {
    color: green[500], // Change the color based on your theme
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoadingButton = (props) => {
  const classes = useStyles();
  const { children, loading, valid, success, fail, onClick, ...other } = props;

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color={success ? "primary" : fail ? "error" : "primary"} // Customize button color based on success or failure
        fullWidth
        disabled={loading || !valid}
        onClick={onClick}
        {...other}
      >
        {children}
      </Button>
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  fail: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default LoadingButton;
