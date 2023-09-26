import { useState, useContext, useEffect } from "react";
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
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const headers = { Authorization: `Bearer ${user.token}` };
  
  const handleChangedeposit = (event) => {
    setdeposit({ ...deposit, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Pin){
        error.Pin = "Pin is required!";
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
        alert("Balance :"+response.data);
      }

    }).catch((err) => {
      console.log(err);
      alert(err.response.data)
    })
  }

  },[errors]);

  return (
    <Card>
      <h1 className="card-header">Enter Deposit Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Deposit Amount:
          <br />
          <Input type="number" name="amount" onChange={handleChangedeposit} />
        </div>
        <p>{errors.amount}</p>
        <div>
          <select type="text" name="currency" onChange={handleChangedeposit}>
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p>{errors.currency}</p>
        <div>
          Pin:
          <br />
          <Input type="number" name="Pin" onChange={handleChangedeposit} />
        </div>
        <p>{errors.Pin}</p>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default ChequeDeposit;
