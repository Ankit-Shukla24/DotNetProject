import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const Transfer = () => {

  const [transfer, setTransfer] = useState({
    Pin: "",
    ToAccountId: 0,
    AmountTransfer: 0,
    currency:"RUPEE"
  });
  const [user, setUser] = useContext(AuthContext);
  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  const config = { headers: headers }
  const handleChangeTransfer = (event) => {
    setTransfer({ ...transfer, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {

    event.preventDefault();

    console.log(transfer);

    axios.post(` https://localhost:7182/api/Accounts/transfer?currency=${transfer.currency}&creditorId=${transfer.ToAccountId}&amount=${transfer.AmountTransfer}&pin=${transfer.Pin}`, {}
      , config).then((response) => {

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
    <>
      <h1>Enter Transfer Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Recepient Account ID:
          <br />
          <input type="number" name="ToAccountId" onChange={handleChangeTransfer} />
        </div>
        <div>
          Transfer Amount:
          <br />
          <input type="number" name="AmountTransfer" onChange={handleChangeTransfer} />
        </div>
        <div>
          Pin:
          <br />
          <input type="number" name="Pin" onChange={handleChangeTransfer} />
        </div>
        
        <div>
        <select type="text" name="currency" onChange={handleChangeTransfer} >
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default Transfer;
