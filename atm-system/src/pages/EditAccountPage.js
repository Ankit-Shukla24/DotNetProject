import React, { useContext, useState,useEffect } from "react";
import axios from "axios";
import Input from "../components/Input/Input"; 
import Button from "../components/Button/Button"; 
import Card from "../components/Card/Card";
import logout from "../components/LogOut";
import "../styles/EditCustomerPage.css";
import { AuthContext } from "../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";
import MiniStatement from "./MiniStatement";

const EditAccountPage = ({acc,id}) => {
  const [user,setUser] = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  const [account, setAccount] = useState(acc);
  const [originalAccount, setOriginalAccount] = useState(acc);

    const handleChangeAccount = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value });
      };
  const headers = {
    "Authorization": `Bearer ${user.token}`
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(account);
    axios.put(`https://localhost:7182/api/Accounts/${id}`, account,{headers:headers})
      .then((response) => {
        console.log(response);
        alert('Changes saved successfully');
        setEditMode(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Error saving changes');
      });
  };

  const handleCancelEdit = () => {
    setAccount(originalAccount);
    setEditMode(false);
  };

  const navigate = useNavigate()
  console.log(acc);
  return !acc ? (<><h2 style={{textAlign:"center"}}>No account configured for the user!</h2><Button onClick={()=>navigate("/account")}>Add account</Button></>) : (
    <>
    <Card>
      <h1 className="card-header">Account Details</h1>
      <form>
        <div className="input-group">
          <label className="input-label">Card Number</label>
          <Input
            type="text"
            name="cardNo"
            value={account.cardNo}
            onChange={handleChangeAccount}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Account Type</label>
          <select type="text" disabled={!editMode} name="accountType" value={account.accountType} onChange={handleChangeAccount} >
              <option> Saving</option>
              <option>Current</option>
              <option>Salary</option>
            </select>
        </div>
        <div className="input-group">
          <label className="input-label">City</label>
          <Input
            type="text"
            name="city"
            value={account.city}
            onChange={handleChangeAccount}
            disabled={!editMode}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Balance</label>
          <Input
            type="number"
            name="balance"
            value={account.balance}
            onChange={handleChangeAccount}
            disabled
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
    <div style={{marginTop:"50px"}}> 
        <MiniStatement id={id}/> 
    </div>
     </>
  )
};

export default EditAccountPage;
