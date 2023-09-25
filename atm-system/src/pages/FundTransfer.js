import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";

const Transfer = () => {
  const [transfer, setTransfer] = useState({
    Pin: "",
    ToAccountId: 0,
    AmountTransfer: 0,
    currency: "RUPEE",
  });
  const [user, setUser] = useContext(AuthContext);
  const headers = { "Authorization": `Bearer ${user.token}` };
  const handleChangeTransfer = (event) => {
    setTransfer({ ...transfer, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(transfer);

    axios.post(` https://localhost:7182/api/Accounts/transfer?currency=${transfer.currency}&creditorId=${transfer.ToAccountId}&amount=${transfer.AmountTransfer}&pin=${transfer.Pin}`, {}
      , {headers:headers}).then((response) => {

        console.log(response);
        if (response.status == 200) {
          alert(response.data);
        }

      }).catch((err) => {
        console.log(err);
        alert(err.response.data)
      })
  };
  return (
    <Card>
      <h1>Enter Transfer Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Recepient Account ID:
          <br />
          <Input
            type="number"
            name="ToAccountId"
            onChange={handleChangeTransfer}
          />
        </div>
        <div>
          Transfer Amount:
          <br />
          <Input
            type="number"
            name="AmountTransfer"
            onChange={handleChangeTransfer}
          />
        </div>
        <div>
          Pin:
          <br />
          <Input type="number" name="Pin" onChange={handleChangeTransfer} />
        </div>

        <div>
          <select type="text" name="currency" onChange={handleChangeTransfer}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
          </select>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </Card>
  );
};

export default Transfer;
