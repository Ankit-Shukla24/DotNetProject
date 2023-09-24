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
    Balance: ""
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
        error.password = "Pin must contain 4 numbers";
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
  let token = eval(user);
  token=token.token;
  const headers = {"Authorization":`Bearer `+token};
  console.log(account);
  axios
    .post("https://localhost:7182/api/Accounts", account,{headers})
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
        <div>
          Card Number:
          <br />
          <input type="text" name="CardNo" onChange={handleChangeAccount} />
        </div>
        <div>
          Pin:
          <br />
          <input type="text" name="Pin" onChange={handleChangeAccount} />
        </div>
        <div>
          Account type:
          <br />
          <select type="text" name="AccountType" onChange={handleChangeAccount} >
            <option> Saving</option>
            <option>Current</option>
            <option>Salary</option>
          </select>
        </div>
        <div>
          City:
          <br />
          <input type="text" name="City" onChange={handleChangeAccount} />
        </div>
        <div>
          Balance:
          <br />
          <input type="number" name="Balance" onChange={handleChangeAccount} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default AccountDetails;
