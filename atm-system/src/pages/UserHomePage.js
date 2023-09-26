import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card"; 
import Button from "../components/Button/Button"; 
import "../styles/UserHomePage.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { currencyRates } from "../utils/constants";

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
      alert(`Your account balance is \nINR ${response.data}\nUSD ${(response.data/currencyRates.USD).toFixed(2)}\nEUR ${(response.data/currencyRates.EURO).toFixed(2)}\nRUB ${(response.data/currencyRates.RUBLE).toFixed(2)}\nYEN ${(response.data/currencyRates.YEN).toFixed(2)}`);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
};
  return (
    <Card>
      <h1 className="card-header">Welcome</h1>
      <div className="user-options">
        <Button onClick={() => navigate("/withdraw")}>Withdraw Money</Button>
        <Button onClick={() => navigate("/deposit")}>Deposit Cheque</Button>
        <Button onClick={() => navigate("/transfer")}>Fund Transfer</Button>
        <Button onClick={handleBalanceShow}>Balance</Button>
        <Button onClick={() => navigate("/statement")}>Mini Statement</Button>
        <Button onClick={() => navigate("/pinchange")}>Change Pin</Button>
        <Button onClick={() => navigate("/changepassword")}>
          Change Password
        </Button>
      </div>
    </Card>
  );
};

export default UserHomePage;
