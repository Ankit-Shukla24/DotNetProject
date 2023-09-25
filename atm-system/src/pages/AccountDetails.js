import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout from "../components/LogOut";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";


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
  console.log(user)
  const handleSubmit = (event) => {
    
    const headers = {"Authorization":`Bearer ${user.token}`};
    event.preventDefault();
    
    console.log(account);
    axios
      .post("https://localhost:7182/api/Accounts", account,{headers:headers})
      .then((response) => {
        console.log(response);
        alert(response.data);
        navigate("/");
      })
      .catch((err) => {console.log(err);
        alert(err.response.data)
      });
  };

  return (
    <Card>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
          Customerid:
          <br />
          <Input type="text" name="Customerid" onChange={handleChangeAccount} />
        </div>
        <div>
          Card Number:
          <br />
          <Input type="text" name="CardNo" onChange={handleChangeAccount} />
        </div>
        <div>
          Pin:
          <br />
          <Input type="text" name="Pin" onChange={handleChangeAccount} />
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
          <Input type="text" name="City" onChange={handleChangeAccount} />
        </div>
        <div>
          Balance:
          <br />
          <Input type="number" name="Balance" onChange={handleChangeAccount} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default AccountDetails;
