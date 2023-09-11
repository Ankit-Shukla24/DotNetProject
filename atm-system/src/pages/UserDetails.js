import { useState } from "react";
import axios from "axios";

const UserDetails = () => {
  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    EmailId: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Accounts: []
  });

  const [account, setAccount] = useState({
    AccountType: "Saving",
    Pin: "",
    CardNo: "",
    City: "",
    Balance: ""
  });

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleChangeAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    customer.Accounts = [account];

    event.preventDefault();
    console.log(customer);
    console.log(account);
    axios
      .post("https://localhost:7182/api/Customers", customer)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          First name:
          <br />
          <input type="text" name="FirstName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Last name:
          <br />
          <input type="text" name="LastName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Address:
          <br />
          <input type="text" name="Address" onChange={handleChangeCustomer} />
        </div>
        <div>
          Email:
          <br />
          <input type="email" name="EmailId" onChange={handleChangeCustomer} />
        </div>
        <div>
          Contact:
          <br />
          <input
            type="text"
            name="PhoneNumber"
            onChange={handleChangeCustomer}
          />
        </div>
        <div>
          Date of Birth:
          <br />
          <input
            type="date"
            name="DateOfBirth"
            onChange={handleChangeCustomer}
          />
        </div>
        <div>
          Card Number:
          <br />
          <input type="text" name="CardNo" onChange={handleChangeAccount} />
        </div>
        <div>
          Pin:
          <br />
          <input type="number" name="Pin" onChange={handleChangeAccount} />
        </div>
        <div>
          Account type:
          <br />
          <select type="text" name="AccountType" onChange={handleChangeAccount} >
            <option> Saving</option>
            <option>Current</option>
            <option>Salary</option>
          </select>
        </div>
        <div>
          City:
          <br />
          <input type="text" name="City" onChange={handleChangeAccount} />
        </div>
        <div>
          Balance:
          <br />
          <input type="number" name="Balance" onChange={handleChangeAccount} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserDetails;
