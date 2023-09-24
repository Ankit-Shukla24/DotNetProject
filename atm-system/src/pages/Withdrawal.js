import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import "../styles/Withdrawal.css";
const Withdrawal = () => {
  const [user, setUser] = useContext(AuthContext);
  const [withdrawal, setWithdrawal] = useState({
    Pin: "",
    amount: 0,
    currency: "RUPEE",
  });

  // let token = eval(user);
  // token = token.token;
  // const headers = { "Authorization": `Bearer ` + token };
  const handleChangeWithdrawal = (event) => {
    setWithdrawal({ ...withdrawal, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(withdrawal);

    // axios.post(`https://localhost:7182/api/Accounts/withdraw?currency=${withdrawal.currency}&amount=${withdrawal.amount}&pin=${withdrawal.Pin}`, {}, { headers: headers }).then((response) => {

    //   console.log(response);
    //   if (response.status == 200) {
    //     alert("Remaining balance :" + response.data);
    //   }

    // }).catch((err) => {
    //   console.log(err);
    //   alert(err.response.data);
    // })
  };

  return (
    <Card>
      <h1>Enter Withdrawal Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Enter amount:
          <br />
          <Input
            type="number"
            name="amount"
            onChange={handleChangeWithdrawal}
          />
        </div>
        <div>
          <select type="text" name="currency" onChange={handleChangeWithdrawal}>
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
          <Input type="number" name="Pin" onChange={handleChangeWithdrawal} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default Withdrawal;
