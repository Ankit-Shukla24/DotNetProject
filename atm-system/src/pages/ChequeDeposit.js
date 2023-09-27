import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router-dom";

const ChequeDeposit = () => {
  const [user, setUser] = useContext(AuthContext);
  const [deposit, setdeposit] = useState({
    Pin: "",
    amount: 0,
    currency: "RUPEE",
  });

  const navigator = useNavigate();

  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const headers = { Authorization: `Bearer ${user.token}` };
  
  const handleChangedeposit = (event) => {
    setdeposit({ ...deposit, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Pin){
        error.Pin = "Pin is required";
    }
    else if(values.Pin.length != 4){
        error.Pin = "Pin must contain 4 digits";
    }
    if(values.amount == 0 ){
        error.amount = "Deposit amount cannot be 0";
    }
    else if(values.amount <0)
    {
      error.amount = "Deposit amount cannot be negative";
    }
    return error;
}
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setErrors(validate(deposit));
  setIsSubmit(true);
  
}
  useEffect(() => {

    if (Object.keys(errors).length === 0 && isSubmit)
    {console.log(deposit);

    axios.post(`https://localhost:7182/api/Accounts/deposit?currency=${deposit.currency}&amount=${deposit.amount}&pin=${deposit.Pin}`, {}, { headers: headers }).then((response) => {

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
      <h1 className="card-header">Deposit Cheque</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Deposit Amount:
          <br />
          <Input type="number" name="amount" onChange={handleChangedeposit} />
        </div>
        <p className="error-message">{errors.amount}</p>
        <div>
          <select type="text" name="currency" onChange={handleChangedeposit}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p className="error-message">{errors.currency}</p>
        <div>
          Pin:
          <br />
          <Input 
            type="password" 
            name="Pin" 
            value={deposit.Pin} 
            onChange={(event)=>setdeposit({...deposit,Pin:event.target?.value?.match(/\d+/g)?.[0] ?? ""})} 
          />
        </div>
        <p className="error-message">{errors.Pin}</p>
        <div className="button-container"><Button type="submit">Submit</Button></div>
      </form>
    </Card>
  );
};

export default ChequeDeposit;
