import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input/Input"; // Import the Input component
import Button from "../components/Button/Button"; // Import the Button component
import Card from "../components/Card/Card"; // Import the Card component
import logout from "../components/LogOut";
import "../styles/EditCustomerPage.css";

const EditCustomerPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: "John",
    LastName: "Doe",
    Address: "1234 Elm St",
    EmailId: "john.doe@example.com",
    PhoneNumber: "123-456-7890",
    DateOfBirth: "1990-01-01",
  });
  const [originalCustomer, setOriginalCustomer] = useState({
    firstName: "John",
    LastName: "Doe",
    Address: "1234 Elm St",
    EmailId: "john.doe@example.com",
    PhoneNumber: "123-456-7890",
    DateOfBirth: "1990-01-01",
  });

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(customer);
    // Add your API endpoint for saving changes here
    // axios.post('API_ENDPOINT_HERE', customer)
    //   .then((response) => {
    //     console.log(response);
    //     alert('Changes saved successfully');
    //     setEditMode(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert('Error saving changes');
    //   });
  };

  const handleCancelEdit = () => {
    setCustomer(originalCustomer);
    setEditMode(false);
  };

  return (
    <Card>
      <h1>User Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">First name</label>
          <Input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Last name</label>
          <Input
            type="text"
            name="LastName"
            value={customer.LastName}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Address</label>
          <Input
            type="text"
            name="Address"
            value={customer.Address}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email</label>
          <Input
            type="email"
            name="EmailId"
            value={customer.EmailId}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Contact</label>
          <Input
            type="text"
            name="PhoneNumber"
            value={customer.PhoneNumber}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Date of Birth</label>
          <Input
            type="date"
            name="DateOfBirth"
            value={customer.DateOfBirth}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="button-container">
          {editMode ? (
            <>
              <Button type="submit">Save</Button>
              <span className="button-spacing"></span>
              <Button type="button" onClick={handleCancelEdit} secondary>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default EditCustomerPage;
