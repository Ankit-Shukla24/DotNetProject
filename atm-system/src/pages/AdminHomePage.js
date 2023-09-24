import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import "../styles/AdminHomePage.css";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    {
      customerId: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      contact: "1234567890",
      dateOfBirth: "1990-01-01",
    },
    {
      customerId: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      contact: "9876543210",
      dateOfBirth: "1985-05-15",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_HERE");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customerId.includes(searchTerm) ||
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
                <td>{customer.contact}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHomePage;
