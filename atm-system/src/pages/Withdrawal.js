import { useState, useContext, useEffect } from "react";
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
      error.Pin = "Pin is required!";
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
        alert("Remaining balance :" + response.data);
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
          Pin :
          <br />
          <Input type="number" name="Pin" onChange={handleChangeWithdrawal} />
        </div>
        <p>{errors.Pin}</p>
        <div>
          Enter amount:
          <br />
          <Input
            type="number"
            name="amount"
            onChange={handleChangeWithdrawal}
          />
        </div>
        <p>{errors.amount}</p>
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
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};

export default Withdrawal;
