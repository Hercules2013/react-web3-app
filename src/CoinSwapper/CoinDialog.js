import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogActions from "@mui/material/DialogActions";
import CloseIcon from '@mui/icons-material/Close';
import CoinButton from "./CoinButton";
import { doesTokenExist } from "../ethereumFunctions";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  dialogContainer: {
    borderRadius: theme.spacing(2),
  },
  titleSection: {
    padding: theme.spacing(2),
  },
  titleText: {
    alignSelf: "center",
  },
  hr: {
    margin: 0,
  },
  address: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
  },
  coinList: {
    height: "300px",
    overflowY: "scroll",
  },
  coinContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
});

const DialogTitle = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}))((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon /> {/* Using Cancel icon */}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
}))(MuiDialogActions);

export default function CoinDialog(props) {
  const { onClose, open, coins, signer } = props;

  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");

  const submit = () => {
    if (doesTokenExist(address, signer)) {
      exit(address);
    } else {
      setError("This address is not valid");
    }
  };

  const exit = (value) => {
    setError("");
    setAddress("");
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => exit(undefined)}
      fullWidth
      maxWidth="sm"
      classes={{ paper: styles.dialogContainer }}
    >
      <DialogTitle onClose={() => exit(undefined)}>Select Coin</DialogTitle>

      <hr className={styles.hr} />

      <div className={styles.coinContainer}>
        <Grid container direction="column" spacing={1} alignContent="center">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Paste Address"
            className={styles.address}
          />
          {error && <Typography color="error">{error}</Typography>}
          <hr className={styles.hr} />

          <Grid item className={styles.coinList}>
            <Grid container direction="column">
              {coins.map((coin, index) => (
                <Grid item key={index} xs={12}>
                  <CoinButton
                    coinName={coin.name}
                    coinAbbr={coin.abbr}
                    onClick={() => exit(coin.address)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <hr className={styles.hr} />

      <DialogActions>
        <Button autoFocus onClick={submit} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CoinDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  signer: PropTypes.object.isRequired, // Assuming signer is an object
};
