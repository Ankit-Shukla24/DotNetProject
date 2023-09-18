import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ChequeDeposit = () => {
  const[user,setUser] = useContext(AuthContext);
  const [deposit, setdeposit] = useState({
    Pin:"",
    accountNumber:0,
    amount:0
  });
  let token = eval(user);
  token=token.token;
  const headers = {"Authorization":`Bearer `+token};
  const handleChangedeposit = (event) => {
    setdeposit({ ...deposit, [event.target.name]: event.target.value });
  };

  const handleSubmit =(event) => {

    event.preventDefault();
    
    console.log(deposit);

     axios.post(`https://localhost:7182/api/Accounts/deposit?accountNumber=${deposit.accountNumber}&amount=${deposit.amount}`,{},{headers}).then((response)=>{
    console.log(token);
    console.log(response);
      if(response.status==201)
        {
            alert(response.data.message);
        }

  }).catch((err)=>{console.log(err);})
      
  };

  return (
    <>
      <h1>Enter Deposit Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
        ToAccountId:
          <br />
          <input type="number" name="accountNumber" onChange={handleChangedeposit} />
        </div>
        <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangedeposit} />
        </div>
        <div>
         DepositAmount:
          <br />
          <input type="number" name="amount" onChange={handleChangedeposit} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ChequeDeposit;