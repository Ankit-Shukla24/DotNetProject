import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const Withdrawal = () => {
  const[user,setUser] = useContext(AuthContext);
  const [withdrawal, setWithdrawal] = useState({
   
    accountNumber:0,
    amount:0,
    
  });
  
  let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
  const handleChangeWithdrawal = (event) => {
    setWithdrawal({ ...withdrawal, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(withdrawal);

    axios.post(`https://localhost:7182/api/Accounts/withdraw?accountNumber=${withdrawal.accountNumber}&amount=${withdrawal.amount}`,{headers}).then((response)=>{
        
    console.log(response);
      if(response.status==200)
        {
            alert("Remaining balance :" + response.data);
        }

  }).catch((err)=>{console.log(err);
    alert(err.message);
  })
      
  };

  return (
    <>
      <h1>Enter Withdrawal Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
          FromAccountId:
          <br />
          <input type="number" name="accountNumber" onChange={handleChangeWithdrawal} />
        </div>
        {/* <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangeWithdrawal} />
        </div> */}
        <div>
          AmountWithdrawn:
          <br />
          <input type="number" name="amount" onChange={handleChangeWithdrawal} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default Withdrawal;
