import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import "../styles/AdminHomePage.css";
import { AuthContext } from "../context/AuthContext";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user,setUser] = useContext(AuthContext);
  const token = user.token;
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        await axios.get("https://localhost:7182/api/Customers",{headers:headers})
        .then((response)=>{
            setCustomers(response.data);
        })
        .catch((err)=>console.log(err));
        
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customerId.toString().includes(searchTerm) ||
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin-page">
      <h1>Customer List</h1>
      <div className="input-container">
        <Input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          className="custom-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => navigate("/user")}>Add Customer</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Full Name</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan="3">No customers available.</td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => (
              <tr
                key={customer.customerId}
                onClick={() => navigate(`/customer/${customer.customerId}`)}
                className="hover-row"
              >
                <td>{customer.customerId}</td>
                <td>{`${customer.firstName} ${customer.lastName}`}</td>
                <td>{customer.phoneNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHomePage;
