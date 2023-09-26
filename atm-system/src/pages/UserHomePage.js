import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card"; 
import Button from "../components/Button/Button"; 
import "../styles/UserHomePage.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const UserHomePage = () => {
  const navigate = useNavigate();
  const [user,setUser] = useContext(AuthContext);
  const headers = {
    "Authorization": `Bearer ${user.token}`
  }
  const handleBalanceShow = (event) => {

  axios
    .get(`https://localhost:7182/api/Accounts/balance`, { headers: headers })
    .then((response) => {
      console.log(response.data);
      alert(`Your account balance is ${response.data}`);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
};
  return (
    <Card>
      <h1 className="card-header">User Home Page</h1>
      <div className="button-container">
        <Button onClick={() => navigate("/withdraw")}>Withdraw Money</Button>
        <Button onClick={() => navigate("/deposit")}>Deposit Cheque</Button>
        <Button onClick={() => navigate("/transfer")}>Fund Transfer</Button>
        <Button onClick={handleBalanceShow}>Balance</Button>
        <Button onClick={() => navigate("/statement")}>Mini Statement</Button>
        <Button onClick={() => navigate("/pinchange")}>Pin Change</Button>
        <Button onClick={() => navigate("/changepassword")}>
          Change Password
        </Button>
      </div>
    </Card>
  );
};

export default UserHomePage;
