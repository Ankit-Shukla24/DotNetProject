import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CheckDeposit = () => {
  const[user,setUser] = useContext(AuthContext);
  const [deposit, setdeposit] = useState({
    Pin:"",
    ToAccountId:"",
    AmountWithdrawn:""
  });
  let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
  const handleChangedeposit = (event) => {
    setdeposit({ ...deposit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(deposit);

    axios.get(`https://localhost:7182/api/Accounts/${deposit.ToAccountId}`,{headers}).then((response)=>{
        
      if(response.data.pin!=deposit.Pin)
        {
            alert("Incorrect Pin")
        }
else
{
    axios
      .post("https://localhost:7182/api/Transactionhistories", deposit)
      .then((response) => {
        console.log(response);
      }).catch((err) => console.log(err));
    }
  })
      
  };

  return (
    <>
      <h1>Enter Deposit Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
        ToAccountId:
          <br />
          <input type="number" name="ToAccountId" onChange={handleChangedeposit} />
        </div>
        <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangedeposit} />
        </div>
        <div>
         DepositAmount:
          <br />
          <input type="number" name="AmountWithdrawn" onChange={handleChangedeposit} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CheckDeposit;
