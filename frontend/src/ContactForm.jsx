import { useState, useEffect } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, SetFirstName] = useState(existingContact.firstName || "");
  const [lastName, SetLastName] = useState(existingContact.lastName || "");
  const [email, SetEmail] = useState(existingContact.email || "");



  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
    };
    const url = updating
      ? `http://127.0.0.1:5000/update_contact/${existingContact.id}`
      : "http://127.0.0.1:5000/create_contact";

    const options = {
      method: updating ? "PATCH":"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if ((response.status !== 201) && (response.status !== 200)) {
      const data = await response.json();
      alert(data.message);
    }else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <br />
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => SetFirstName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <br />
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => SetLastName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        ></input>
        <br />
      </div>
      <button type="submit" className="centered-button">
        {updating ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default ContactForm;
