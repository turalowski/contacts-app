import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { ContactContext } from "../../context/contact-context";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "30px 0",
  },
  title: {
    fontSize: 5,
  },
});

const Contact = ({ id, firstName, lastName, number }) => {
  const { setIsEditing, setError } = useContext(ContactContext);
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (e) => {
    setError("");
    setIsEditing(false);
    history.push(`/contacts/${id}`);
  };

  useEffect(() => {});
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color="textSecondary">{number}</Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={handleClick}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Contact;
