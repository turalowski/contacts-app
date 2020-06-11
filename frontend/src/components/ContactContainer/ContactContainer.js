import React, { useContext, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import { ContactContext } from "../../context/contact-context";
// Contact
import Contact from "../Contact/Contact";
import { getContacts } from "../../utils/requests";

const useStyles = makeStyles(() => ({
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const ContactContainer = (props) => {
  const { contacts, setContacts } = useContext(ContactContext);

  useEffect(() => {
    (async () => {
      const data = await getContacts();
      setContacts(data);
    })()
  }, [setContacts]);
  
  
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {contacts ? (
        contacts.map((contact) => <Contact key={contact.id} {...contact} />)
      ) : (
        <div className={classes.spinner}>
          <Loader
            type="TailSpin"
            color="#3F51B5"
            timeout={3000} //3 secs
          />
        </div>
      )}
    </Container>
  );
}

export default ContactContainer;