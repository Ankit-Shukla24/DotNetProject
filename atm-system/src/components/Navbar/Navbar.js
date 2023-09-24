import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logout from "../LogOut";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="logo">Company</div>
      <div className="user-details">
        <span className="username">Hello, test</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
