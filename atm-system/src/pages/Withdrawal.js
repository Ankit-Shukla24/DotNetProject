import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import "../styles/Withdrawal.css";
import { useNavigate } from "react-router-dom";
const Withdrawal = () => {
  const [user, setUser] = useContext(AuthContext);
  const [withdrawal, setWithdrawal] = useState({
    Pin: "",
    amount: 0,
    currency: "RUPEE",
  });
  const navigator = useNavigate();
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  const handleChangeWithdrawal = (event) => {
    setWithdrawal({ ...withdrawal, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(values.amount == 0 ){
        error.amount = "Withdraw amount cannot be 0";
    }
    else if(values.amount < 0 ){
      error.amount = "Withdraw amount cannot be negative";
  }
    if(!values.Pin){
      error.Pin = "Pin is required";
  }
  else if(values.Pin.length != 4){
      error.Pin = "Pin must contain 4 numbers";
  }
    return error;
}
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setErrors(validate(withdrawal));
  setIsSubmit(true);
  
}
  useEffect( () => {

    
    if (Object.keys(errors).length === 0 && isSubmit){
    console.log(withdrawal);

    axios.post(`https://localhost:7182/api/Accounts/withdraw?currency=${withdrawal.currency}&amount=${withdrawal.amount}&pin=${withdrawal.Pin}`, {}, { headers: headers }).then((response) => {

      console.log(response);
      if (response.status == 200) {
        alert(response.data);
        navigator('/');
      }

    }).catch((err) => {
      console.log(err);
      alert(err.response.data);
    })
  }
  },[errors]);
  
  return (
    <Card>
      <h1 className="card-header">Withdraw Money</h1>
      <form onSubmit={handleSubmit}>
      <div>
          Pin
          <br />
          <Input 
            type="password" 
            name="Pin" 
            value={withdrawal.Pin} 
            onChange={(event)=>setWithdrawal({...withdrawal,Pin:event.target?.value?.match(/\d+/g)?.[0] ?? ""})} 
          />
        </div>
        <p className="error-message">{errors.Pin}</p>
        <div>
          Enter Amount
          <br />
          <Input
            type="number"
            name="amount"
            onChange={handleChangeWithdrawal}
          />
        </div>
        <p className="error-message">{errors.amount}</p>
        <div>
          <select type="text" name="currency" onChange={handleChangeWithdrawal}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p>{errors.currency}</p>
        <div className="button-container"><Button type="submit">Submit</Button></div>
      </form>
    </Card>
  );
};

export default Withdrawal;
