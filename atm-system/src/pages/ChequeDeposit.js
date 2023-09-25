import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const ChequeDeposit = () => {
  const [user, setUser] = useContext(AuthContext);
  const [deposit, setdeposit] = useState({
    Pin: "",
    amount: 0,
    currency:"RUPEE"
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  
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
    <>
      <h1>Enter Deposit Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          DepositAmount:
          <br />
          <input type="number" name="amount" onChange={handleChangedeposit} />
        </div>
        <p>{errors.amount}</p>
        <div>
        <select type="text" name="currency" onChange={handleChangedeposit} >
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
            <p>{errors.currency}</p>
        <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangedeposit} />
        </div>
        <p>{errors.Pin}</p>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default ChequeDeposit;