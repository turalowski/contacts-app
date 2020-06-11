import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "50px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: "pointer",
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (e) => {
    history.push("/contacts/new");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={(e) => history.push("/contacts")}
          >
            Contact List
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Add a new contact
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
