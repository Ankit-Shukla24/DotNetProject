import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout from "../components/LogOut";


const AccountDetails = () => {
  const navigate = useNavigate();

  const [user,setUser] = useContext(AuthContext);
 
  
  const [account, setAccount] = useState({
    Customerid: "",
    AccountType: "Saving",
    Pin: "",
    CardNo: "",
    City: "",
    Balance: 0
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChangeAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Customerid){
        error.Customerid = "Customerid is required!";
    }
    if(!values.Pin){
        error.Pin = "Pin is required!";
    }
    else if(values.Pin.length != 4 ){
        error.Pin = "Pin must contain 4 numbers";
    }
    if(!values.CardNo){
      error.CardNo = "Card number is required!";
    }
    else if(values.CardNo.length != 12 ){
        error.CardNo = "Card number must contain 12 numbers";
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
      alert(err.response.data)
    });}
  },[errors]);

  return (
    <>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
          Customerid:
          <br />
          <input type="text" name="Customerid" onChange={handleChangeAccount} />
        </div>
        <p>{errors.Customerid}</p>
        <div>
          Card Number:
          <br />
          <input type="text" name="CardNo" onChange={handleChangeAccount} />
        </div>
        <p>{errors.CardNo}</p>
        <div>
          Pin:
          <br />
          <input type="text" name="Pin" onChange={handleChangeAccount} />
        </div>
        <p>{errors.Pin}</p>
        <div>
          Account type:
          <br />
          <select type="text" name="AccountType" onChange={handleChangeAccount} >
            <option> Saving</option>
            <option>Current</option>
            <option>Salary</option>
          </select>
        </div>
        <p>{errors.AccountType}</p>
        <div>
          City:
          <br />
          <input type="text" name="City" onChange={handleChangeAccount} />
        </div>
        <p>{errors.City}</p>
        <div>
          Balance:
          <br />
          <input type="number" name="Balance" onChange={handleChangeAccount} />
        </div>
        <p>{errors.Balance}</p>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default AccountDetails;
