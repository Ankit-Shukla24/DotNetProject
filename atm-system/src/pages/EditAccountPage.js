import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import Input from "../components/Input/Input"; 
import Button from "../components/Button/Button"; 
import Card from "../components/Card/Card";
import logout from "../components/LogOut";
import "../styles/EditCustomerPage.css";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const EditAccountPage = () => {
  const [user,setUser] = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const {id} = useParams();
  const [account, setAccount] = useState({
    Customerid: "",
    AccountType: "Saving",
    Pin: "",
    CardNo: "",
    City: "",
    Balance: 0
  });
  const [originalAccount, setOriginalAccount] = useState({
        Customerid: "",
        AccountType: "Saving",
        Pin: "",
        CardNo: "",
        City: "",
        Balance: 0
    });

    const handleChangeAccount = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value });
      };
  const headers = {
    "Authorization": `Bearer ${user.token}`
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(account);
    // axios.put(`https://localhost:7182/api/Accounts/${id}`, account,{headers:headers})
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
    setAccount(originalAccount);
    setEditMode(false);
  };

//   useEffect(()=>{
//     axios.get(`https://localhost:7182/api/Customers/${id}`,{headers:headers})
//     .then((response)=>{
//       setAccount(response.data)
//       setOriginalAccount(response.data)
//     })
//     .catch((error)=>{
//       alert(error.response.data)
//     })
//   },[])

  return (
    <Card>
      <h1>Account Details</h1>
      <form>
        <div className="input-group">
          <label className="input-label">Card Number</label>
          <Input
            type="text"
            name="CardNo"
            value={account.CardNo}
            onChange={handleChangeAccount}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">PIN</label>
          <Input
            type="text"
            name="Pin"
            value={account.Pin}
            onChange={handleChangeAccount}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Account Type</label>
          <select type="text" name="AccountType" value={account.AccountType} onChange={handleChangeAccount} >
              <option> Saving</option>
              <option>Current</option>
              <option>Salary</option>
            </select>
        </div>
        <div className="input-group">
          <label className="input-label">City</label>
          <Input
            type="email"
            name="City"
            value={account.City}
            onChange={handleChangeAccount}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Balance</label>
          <Input
            type="number"
            name="Balance"
            value={account.Balance}
            onChange={handleChangeAccount}
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

export default EditAccountPage;
