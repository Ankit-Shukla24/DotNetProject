import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import logout from "../components/LogOut";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";


const AccountDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user,setUser] = useContext(AuthContext);
 

  const [account, setAccount] = useState({
    Customerid: location?.state?.customerId?.toString() ?? "",
    AccountType: "Saving",
    Pin: "",
    CardNo: "",
    City: "",
    Balance:0
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChangeAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    const regexCardNumber = /^\d{12}$/;
    const regexPin = /^\d{4}$/;
    if(!values.Customerid){
        error.Customerid = "Customer Id is required";
    }
    if(!values.Pin){
        error.Pin = "Pin is required";
    }
    else if(values.Pin.length != 4 ){
        error.Pin = "Pin must contain 4 digits";
    }
    else if(!regexPin.test(values.Pin))
    {
      error.Pin = "Enter digits only";
    }
    if(!values.CardNo){
      error.CardNo = "Card number is required";
    }
    else if(values.CardNo.length != 12 ){

        error.CardNo = "Card number must contain 12 digits";

      error.CardNo = "Card number must contain 12 numbers";
  }
    else if(!regexCardNumber.test(values.CardNo))
    {
      error.CardNo = "Enter digits only";
    }
    if(!values.City){
      error.City = "City is required";
    }
    if(!values.Balance)
    {
      error.Balance="Enter a amount";

    }
    else if(values.Balance<0)
    {
      error.Balance="Balance cannot be negative";
    }
    return error;
}
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setErrors(validate(account));
   setIsSubmit(true); 
}
useEffect(() => {
  console.log(errors);
  if (Object.keys(errors).length === 0 && isSubmit) {
  
  const headers = {"Authorization":`Bearer ${user.token}`};
  console.log(account);
  axios
    .post("https://localhost:7182/api/Accounts", account,{headers:headers})
    .then((response) => {
      console.log(response);
      alert(response.data);
      navigate("/");
    })
    .catch((err) => {console.log(err);
      alert(JSON.stringify(err.response.data.errors));
  
    });}
  },[errors]);

  return (
    <Card>
      <h1 className="card-header">Enter Account Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
          Customerid:
          <br />
          <Input value={account.Customerid} type="text" name="Customerid" onChange={handleChangeAccount} />
        </div>
        <p className='error-message'>{errors.Customerid}</p>
        <div>
          Card Number:
          <br />
          <Input type="text" name="CardNo" onChange={handleChangeAccount} />
        </div>
        <p className='error-message'>{errors.CardNo}</p>
        <div>
          Pin:
          <br />
          <Input 
            type="password" 
            name="Pin" 
            value={account.Pin} 
            onChange={(event)=>setAccount({...account,Pin:event.target?.value?.match(/\d+/g)?.[0] ?? ""})} 
          />
        </div>
        <p className='error-message'>{errors.Pin}</p>
        <div>
          Account type:
          <br />
            <select type="text" name="AccountType" onChange={handleChangeAccount} >
              <option> Saving</option>
              <option>Current</option>
              <option>Salary</option>
            </select>
        </div>
        <p className='error-message'>{errors.AccountType}</p>
        <div>
          City:
          <br />
          <Input type="text" name="City" onChange={handleChangeAccount} />
        </div>
        <p className="error-message">{errors.City}</p>
        <div>
          Balance:
          <br />
          <Input type="number" name="Balance" onChange={handleChangeAccount} />
        </div>
        <p className='error-message'>{errors.Balance}</p>
        <div className="button-container"><Button type="submit">Submit</Button></div>
      </form>
    </Card>
  );
};

export default AccountDetails;
