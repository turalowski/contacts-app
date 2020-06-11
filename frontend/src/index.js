import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContactProvider } from "./context/contact-context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ContactProvider>
          <App />
      </ContactProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
