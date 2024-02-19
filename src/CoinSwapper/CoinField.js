import PropTypes from "prop-types";
import { Fab, Grid, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    minHeight: "80px",
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(2),
    borderColor: theme.palette.grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
  },
  container_input: {
    padding: theme.spacing(1),
    minHeight: "68px",
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(2),
    borderColor: theme.palette.grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: "50%",
    textAlign: "right",
  },
  container_blank: {
    padding: theme.spacing(1),
    minHeight: "80px",
    borderRadius: theme.spacing(2),
  },
  grid: {
    height: "60px",
  },
  fab: {
    zIndex: "0",
  },
  input: {
    ...theme.typography.h5,
    width: "100%",
    textAlign: "right",
    marginLeft: "1rem",
  },
}));

export function RemoveLiquidityField1(props) {
  const classes = useStyles();
  const { onClick, symbol, value, onChange, activeField } = props;

  return (
    <div className={classes.container_blank}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
        spacing={2}
      >
        {/* Text Field */}
        <Grid item xs={9}>
          <InputBase
            value={value}
            onChange={onChange}
            placeholder="0.0"
            disabled={!activeField}
            classes={{
              root: classes.container_input,
              input: classes.input,
            }}
          />
        </Grid>
        {/* Button */}
        <Grid item xs={3}>
          <Fab
            size="small"
            variant="extended"
            onClick={onClick}
            className={classes.fab}
          >
            {symbol}
            <ExpandMoreIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

export function RemoveLiquidityField2(props) {
  const classes = useStyles();
  const { onClick, symbol } = props;

  return (
    <div className={classes.container_blank}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
      >
        {/* Button */}
        <Grid item xs={3}>
          <Fab
            size="small"
            variant="extended"
            onClick={onClick}
            className={classes.fab}
          >
            {symbol}
            <ExpandMoreIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

export default function CoinField(props) {
  const classes = useStyles();
  const { onClick, symbol, value, onChange, activeField } = props;

  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
      >
        {/* Button */}
        <Grid item xs={3}>
          <Fab
            size="small"
            variant="extended"
            onClick={onClick}
            className={classes.fab}
          >
            {symbol}
            <ExpandMoreIcon />
          </Fab>
        </Grid>

        {/* Text Field */}
        <Grid item xs={9}>
          <InputBase
            value={value}
            onChange={onChange}
            placeholder="0.0"
            disabled={!activeField}
            classes={{ root: classes.input }}
            inputProps={{ className: classes.inputBase }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

CoinField.propTypes = {
  onClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  activeField: PropTypes.bool.isRequired,
};

RemoveLiquidityField1.propTypes = {
  onClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  activeField: PropTypes.bool.isRequired,
};

RemoveLiquidityField2.propTypes = {
  onClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
};
