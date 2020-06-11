import React, { useState, useContext, useEffect } from "react";
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
import { getContact } from "../../utils/requests";
import { editContact, deleteContact } from "../../utils/requests";
import {validateForm} from "../../utils/validator"
// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  date: {
    margin: "10px auto"
  }
}));

const ContactDetails = () => {
  const { error, setError, isEditing, setIsEditing } = useContext(
    ContactContext
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberType, setNumberType] = useState("work");
  const [number, setNumber] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [open, setOpen] = React.useState(false);

  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const handleEdit = (e) => {
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
  useEffect(() => {
    (async () => {
      const data = await getContact(id);
      if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setNumberType(data.numberType);
        setNumber(data.number);
        setCreatedDate(data.createdDate.split('.')[0])
        setModifiedDate(data.modifiedDate.split('.')[0]);
      } else {
        history.push("/contacts");
      }
    })();
  }, [id, history]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModifiedDate(new Date().toISOString().split('.')[0]);
    setError("");
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      numberType: numberType,
      number: number,
      modifiedDate: new Date().toISOString()
    };
    const {isValid, error} = validateForm(newContact);
    if(isValid) {
      await editContact(id, newContact);
      setIsEditing(false);
    }
    else {
      setError(error)
    }
  };

  const handleEditing = async (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    const response = await deleteContact(id);
    response.status === 204
      ? history.push("/contacts")
      : setError("Could not delete contact");
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
              onChange={handleEdit}
              required
              fullWidth
              autoFocus
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="last-name"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={handleEdit}
              fullWidth
              required
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name="number-type"
              variant="outlined"
              value={numberType}
              onChange={handleEdit}
              disabled={!isEditing}
              fullWidth
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
              onChange={handleEdit}
              required
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <TextField
            id="datetime-local"
            label="Created Date"
            type="datetime-local"
            value={createdDate}
            className={classes.date}
            disabled
          />
          <TextField
            id="datetime-local"
            label="Modified Date"
            type="datetime-local"
            value={modifiedDate}
            className={classes.date}
            disabled
          />
        </Grid>

        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={isEditing ? handleSubmit : handleEditing}
        >
          {!isEditing ? "Editing" : "Submit"}
        </Button>
        <Button
          name="delete"
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this contact?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process could not undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactDetails;
