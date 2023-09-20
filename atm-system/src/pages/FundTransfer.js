import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const Transfer = () => {

  const [transfer, setTransfer] = useState({
    Pin: "",
    ToAccountId: 0,
    AmountTransfer: 0
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

    axios.post(` https://localhost:7182/api/Accounts/transfer?creditorId=${transfer.ToAccountId}&amount=${transfer.AmountTransfer}`, {}
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
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangeTransfer} />
        </div>
        <div>
          Amount Transfered:
          <br />
          <input type="number" name="AmountTransfer" onChange={handleChangeTransfer} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default Transfer;
