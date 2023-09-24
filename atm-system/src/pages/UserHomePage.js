import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card"; // Adjust the import path
import Button from "../components/Button/Button"; // Adjust the import path
import "../styles/UserHomePage.css";

const UserHomePage = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <h1>User Home Page</h1>
      <div className="button-container">
        <Button onClick={() => navigate("/withdraw")}>Withdraw Money</Button>
        <Button onClick={() => navigate("/deposit")}>Deposit Cheque</Button>
        <Button onClick={() => navigate("/transfer")}>Fund Transfer</Button>
        <Button>Balance</Button>
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
