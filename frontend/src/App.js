import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import ContactContainer from "./components/ContactContainer/ContactContainer";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import NewContact from "./components/NewContact/NewContact";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/contacts" component={ContactContainer} />
        <Route
          key="add-contact"
          exact
          path="/contacts/new"
          component={NewContact}
        />
        <Route
          key="edit-contact"
          exact
          path="/contacts/:id"
          component={ContactDetails}
        />
      </Switch>
      <Redirect exact from="/" to="/contacts" />
    </>
  );
};

export default App;
