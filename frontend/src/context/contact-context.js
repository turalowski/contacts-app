import React, { useState, createContext } from "react";

export const ContactContext = createContext();

export const ContactConsumer = ContactContext.Consumer;

export const ContactProvider = ({ children }) => {

  const [contacts, setContacts] = useState();
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState();


  return (
    <ContactContext.Provider
      value={{
        contacts,
        error,
        isEditing,
        setError,
        setIsEditing,
        setContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
