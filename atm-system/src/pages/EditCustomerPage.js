import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import Input from "../components/Input/Input"; 
import Button from "../components/Button/Button"; 
import Card from "../components/Card/Card";
import logout from "../components/LogOut";
import "../styles/EditCustomerPage.css";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const EditCustomerPage = ({cust,enabled,id}) => {
  const [user,setUser] = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [customer, setCustomer] = useState(cust);
  const [originalCustomer, setOriginalCustomer] = useState(cust);
  const [isEnabled,setIsEnabled] = useState(enabled);
  const [oldIsEnabled, setOldIsEnabled] = useState(enabled);

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };
  const headers = {
    "Authorization": `Bearer ${user.token}`
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(customer);
    if(originalCustomer != customer){
    axios.put(`https://localhost:7182/api/Customers`, customer,{headers:headers})
      .then((response) => {
        console.log(response);
        alert('Changes saved successfully');
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Error saving changes');
      });
    }

      if(isEnabled != oldIsEnabled) {
        axios.post(`https://localhost:7182/api/Credentials/activity?customerId=${id}&status=${isEnabled}`, {},{headers:headers})
      .then((response) => {
        console.log(response);
        alert('User status changed successfully');
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Error saving changes');
      });
      }

  };

  const handleCancelEdit = () => {
    setCustomer(originalCustomer);
    setEditMode(false);
  };

  

  return (
    <Card>
      <h1 className="card-header">User Details</h1>
      <form>
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
            name="lastName"
            value={customer.lastName}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Address</label>
          <Input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email</label>
          <Input
            type="email"
            name="emailId"
            value={customer.emailId}
            onChange={handleChangeCustomer}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Contact</label>
          <Input
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
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
        <div className="input-group">
          <label className="input-label">User Enabled</label>
          <Input
            type="checkbox"
            name="isEnabled"
            value={isEnabled}
            onChange={(e)=>{setIsEnabled(!isEnabled)}}
            checked = {isEnabled}
            disabled={!editMode}
          />
        </div>
        <div className="button-container">
          {editMode ? (
            <>
              <Button onClick={handleSubmit} type="submit">Save</Button>
              <span className="button-spacing"></span>
              <Button type="button" onClick={handleCancelEdit} secondary>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={(e) =>{ e.preventDefault(); setEditMode(true)}}>
              Edit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default EditCustomerPage;
