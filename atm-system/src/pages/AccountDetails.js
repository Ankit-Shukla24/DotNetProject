import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const AccountDetails = () => {
  const navigate = useNavigate();

  const [user,setUser] = useContext(AuthContext);
 
  
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
    let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
    event.preventDefault();
    
    console.log(account);
    axios
      .post("https://localhost:7182/api/Accounts", account,{headers})
      .then((response) => {
        console.log(response);
        alert('Account added successfully');
        navigate("/");
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
