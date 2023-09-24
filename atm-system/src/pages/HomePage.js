import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import DisableUser from "./DisableUser";
import EnableUser from "./EnableUser";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";

const HomePage = () => {
  const navigate = useNavigate();
  //   const [user, setUser] = useContext(AuthContext);
  //   var balance;
  //   const [balanceShow, setBalanceShow] = useState("false");
  const userDetail = { userType: "customer" };
  //   const userDetail = eval(user);
  //   let token = eval(user);
  //   token = token.token;
  //   const headers = { Authorization: `Bearer ` + token };

  //   const handleBalanceShow = (event) => {
  //     console.log(balanceShow);
  //     setBalanceShow(!balanceShow);
  //     axios
  //       .get(`https://localhost:7182/api/Accounts/balance`, { headers: headers })
  //       .then((response) => {
  //         console.log(response.data);
  //         balance = response.data;
  //         alert(`Your account balance is ${balance}`);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(err.response.data);
  //       });
  //   };
  //Need to change it

  if (userDetail.userType == "Admin") {
    return <AdminHomePage />;
  } else {
    return <UserHomePage />;
  }
};

export default HomePage;
