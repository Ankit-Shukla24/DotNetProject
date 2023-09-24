import { useState, useContext, useEffect } from "react";
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
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  const config = { headers: headers }
  const handleChangeTransfer = (event) => {
    setTransfer({ ...transfer, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Pin){
        error.Pin = "Pin is required!";
    }
    else if(values.Pin.length != 4){
        error.Pin = "Pin must contain 4 numbers";
    }
    if(!values.ToAccountId){
      error.ToAccountId = "AccountId is required!";
    }
    else if(values.ToAccountId.length != 4){
      error.ToAccountId = "AccountId must contain 4 digits";
    }
    if(values.amount == 0 ){
        error.amount = "Transfer amount cannot be 0";
    }
    return error;
}
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setErrors(validate(transfer));
  setIsSubmit(true);
  
}
  useEffect( () => {
    if (Object.keys(errors).length === 0 && isSubmit){
    console.log(transfer);

    axios.post(` https://localhost:7182/api/Accounts/transfer?currency=${transfer.currency}&creditorId=${transfer.ToAccountId}&amount=${transfer.AmountTransfer}`, {}
      , config).then((response) => {

        console.log(response);
        if (response.status == 200) {
          alert(response.data);
        }

      }).catch((err) => {
        console.log(err);
        alert(err.response.data)
      })
    }
  },[errors]);
  return (
    <>
      <h1>Enter Transfer Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Recepient Account ID:
          <br />
          <input type="number" name="ToAccountId" onChange={handleChangeTransfer} />
        </div>
        <p>{errors.ToAccountId}</p>
        <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangeTransfer} />
        </div>
        <p>{errors.Pin}</p>
        <div>
          Amount Transfered:
          <br />
          <input type="number" name="AmountTransfer" onChange={handleChangeTransfer} />
        </div>
        <p>{errors.AmountTransfer}</p>
        <div>
        <select type="text" name="currency" onChange={handleChangeTransfer} >
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p>{errors.currency}</p>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default Transfer;
