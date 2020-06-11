import axios from "axios";

export const addContact = async (contact) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/contacts",
      contact
    );
    return response;
  } catch (error) {}
};

export const getContact = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/contacts/${id}`
    );
    return response.data;
  } catch (error) {}
};

export const getContacts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/contacts");
    return response.data;
  } catch (error) {}
};
export const editContact = async (id, contact) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/contacts/${id}`,
      contact
    );
    return response;
  } catch (error) {}
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/contacts/${id}`
    );
    return response;
  } catch (error) {}
};
