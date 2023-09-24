import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";

const ChequeDeposit = () => {
  const [user, setUser] = useContext(AuthContext);
  const [deposit, setdeposit] = useState({
    Pin: "",
    amount: 0,
    currency: "RUPEE",
  });
  // let token = eval(user);
  // token = token.token;
  // const headers = { Authorization: `Bearer ` + token };
  const handleChangedeposit = (event) => {
    setdeposit({ ...deposit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    //   event.preventDefault();
    //   console.log(deposit);
    //   axios.post(`https://localhost:7182/api/Accounts/deposit?currency=${deposit.currency}&amount=${deposit.amount}&pin=${deposit.Pin}`, {}, { headers: headers }).then((response) => {
    //     console.log(response);
    //     if (response.status == 200) {
    //       alert("Balance :"+response.data);
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //     alert(err.response.data)
    //   })
  };

  return (
    <Card>
      <h1>Enter Deposit Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Deposit Amount:
          <br />
          <Input type="number" name="amount" onChange={handleChangedeposit} />
        </div>
        <div>
          <select type="text" name="currency" onChange={handleChangedeposit}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
          </select>
        </div>
        <div>
          Pin:
          <br />
          <Input type="number" name="Pin" onChange={handleChangedeposit} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default ChequeDeposit;
