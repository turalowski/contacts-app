import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import { ContactContext } from "../../context/contact-context";
import { useHistory, useParams } from "react-router-dom";
import {addContact} from "../../utils/requests"

import {validateForm} from "../../utils/validator"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginBottom: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
  },
}));

const NewContact = () => {
  let { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const {
    error,
    setError,
    isEditing
  } = useContext(ContactContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberType, setNumberType] = useState("work");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "first-name":
        setFirstName(e.target.value);
        break;
      case "last-name":
        setLastName(e.target.value);
        break;
      case "number-type":
        setNumberType(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("")
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      numberType: numberType,
      number: number,
    };
    const {isValid, error} = validateForm(newContact);
    if(isValid) {
      await addContact(newContact);
      history.push("/contacts")
    }
    else {
      setError(error)
    }
  };

  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <Typography className={classes.header} component="h1" variant="h4">
        {!id ? "Add a new Contact" : "Editing an exists contact"}
      </Typography>
      {error && (
        <Alert className={classes.alert} severity="error" variant="outlined">
          {error}
        </Alert>
      )}
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="first-name"
              variant="outlined"
              label="First Name"
              value={firstName}
              onChange={handleChange}
              required={true}
              fullWidth
              autoFocus
              disabled={id && !isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="last-name"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={handleChange}
              fullWidth
              required
              disabled={id && !isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="number-type"
              variant="outlined"
              value={numberType}
              onChange={handleChange}
              fullWidth
              disabled={id && !isEditing}
            >
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="office">Office</MenuItem>
              <MenuItem value="work">Work</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="number"
              label="Number"
              variant="outlined"
              value={number}
              onChange={handleChange}
              required
              fullWidth
              disabled={id && !isEditing}
            />
          </Grid>
        </Grid>
        
          <Button
            className={classes.submit}
            type="submit"
            name="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            Submit
          </Button>
        
      </form>
    </Container>
  );
}

export default NewContact;