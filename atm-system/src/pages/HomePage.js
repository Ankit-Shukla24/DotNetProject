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
    const [user, setUser] = useContext(AuthContext);


  if (user.userType == "Admin") {
    return <AdminHomePage />;
  } else {
    return <UserHomePage />;
  }
};

export default HomePage;
