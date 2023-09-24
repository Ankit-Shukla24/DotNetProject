import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const Withdrawal = () => {
  const [user, setUser] = useContext(AuthContext);
  const [withdrawal, setWithdrawal] = useState({

    amount: 0,
    currency:"RUPEE"

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
        error.password = "Deposit amount cannot be 0";
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

    axios.post(`https://localhost:7182/api/Accounts/withdraw?currency=${withdrawal.currency}&amount=${withdrawal.amount}`, {}, { headers: headers }).then((response) => {

      console.log(response);
      if (response.status == 200) {
        alert("Remaining balance :" + response.data);
      }

    }).catch((err) => {
      console.log(err);
      alert(err.reponse.data);
    })
  }
  },[errors]);

  return (
    <>
      <h1>Enter Withdrawal Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Enter amount:
          <br />
          <input type="number" name="amount" onChange={handleChangeWithdrawal} />
        </div>
        <div>
        <select type="text" name="currency" onChange={handleChangeWithdrawal} >
            <option>RUPEE</option>
            <option>USD</option>
            <option>EURO</option>
            <option>YEN</option>
            <option>RUBLE</option>
            </select>
            </div>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default Withdrawal;
