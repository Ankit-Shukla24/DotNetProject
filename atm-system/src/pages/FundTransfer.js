import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const [transfer, setTransfer] = useState({
    Pin: "",
    ToAccountId: 0,
    AmountTransfer: 0,
    currency: "RUPEE",
  });

  const navigator = useNavigate();

  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  const headers = { "Authorization": `Bearer ${user.token}` };
  const handleChangeTransfer = (event) => {
    setTransfer({ ...transfer, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Pin){
        error.Pin = "Pin is required";
    }
    else if(values.Pin.length != 4){
        error.Pin = "Pin must contain 4 numbers";
    }
    if(!values.ToAccountId){
      error.ToAccountId = "Account id is required";
    }
    else if(values.ToAccountId.length != 4){
      error.ToAccountId = "Account id must contain 4 digits";
    }
    if(values.AmountTransfer == 0 ){
        error.AmountTransfer = "Transfer amount cannot be 0";
    }
    else  if(values.AmountTransfer < 0 ){
      error.AmountTransfer = "Transfer amount cannot be negative";
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

    axios.post(` https://localhost:7182/api/Accounts/transfer?currency=${transfer.currency}&creditorId=${transfer.ToAccountId}&amount=${transfer.AmountTransfer}&pin=${transfer.Pin}`, {}
      , {headers:headers}).then((response) => {

        console.log(response);
        if (response.status == 200) {
          alert(response.data);
          navigator('/');
        }

      }).catch((err) => {
        console.log(err);
        alert(err.response.data)
      })
    }
  },[errors]);
  return (
    <Card>
      <h1 className="card-header">Fund Transfer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Recepient Account ID
          <br />
          <Input
            type="number"
            name="ToAccountId"
            onChange={handleChangeTransfer}
          />
        </div>
        <p>{errors.ToAccountId}</p>
        <div>
          Transfer Amount
          <br />
          <Input
            type="number"
            name="AmountTransfer"
            onChange={handleChangeTransfer}
          />
        </div>
        <p className="error-message">{errors.AmountTransfer }</p>
        <div>
          Pin
          <br />
          <Input 
            type="password" 
            name="Pin" 
            value={transfer.Pin} 
            onChange={(event)=>setTransfer({...transfer,Pin:event.target?.value?.match(/\d+/g)?.[0] ?? ""})} 
          />
        </div>
        <p className="error-message">{errors.Pin}</p>
        <div>
          <select type="text" name="currency" onChange={handleChangeTransfer}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p className="error-message">{errors.currency}</p>
        <div className="button-container"><Button type="submit">Submit</Button></div>
      </form>
    </Card>
  );
};

export default Transfer;
