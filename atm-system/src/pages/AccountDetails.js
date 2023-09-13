import { useState } from "react";
import axios from "axios";

const AccountDetails = () => {

  const [account, setAccount] = useState({
    Customerid: "",
    AccountType: "Saving",
    Pin: "",
    CardNo: "",
    City: "",
    Balance: ""
  });

  const handleChangeAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(account);
    axios
      .post("https://localhost:7182/api/Accounts", account)
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
          Customerid:
          <br />
          <input type="text" name="Customerid" onChange={handleChangeAccount} />
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

export default AccountDetails;
