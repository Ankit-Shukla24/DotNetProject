import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logout from "../LogOut";
import "./Navbar.css";
import Button from "../Button/Button";

const Navbar = () => {
  const [user,setUser] = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  if(!user) return null;
  return (
    <nav className="navbar">
      <div onClick={()=>window.location.href = "/"} className="logo">Wellsman Forgan</div>
      <div className="user-details">
        <span className="username">{`Hello, ${user.userId}`}</span>
        <Button onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
