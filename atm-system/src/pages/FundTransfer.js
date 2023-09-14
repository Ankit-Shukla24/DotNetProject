import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Transfer = () => {
    const [transfer, setTransfer] = useState({
      Pin:"",
      FromAccountId:"",
      ToAccountId:"",
      AmountTransfer:""
    });
  const [user,setUser] = useContext(AuthContext)
    const handleChangeTransfer = (event) => {
      setTransfer({ ...transfer, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
  
      event.preventDefault();
      
      console.log(transfer);
      let token = eval(user);
      token=token.token;
      const headers = {"Authorization":`Bearer `+token};
      axios.post(`https://localhost:7182/api/Accounts/${transfer.FromAccountId}`,{headers}).then((response)=>{
        
      if(response.status==201)
        {
            alert(response.data.message);
        }
    else
    {
        axios
        .post("https://localhost:7182/api/Transactionhistories",transfer, {headers})
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    }}
    ).catch((err)=>console.log(err));
    };
  
    return (
      <>
        <h1>Enter Transfer Details</h1>
        <form onSubmit={handleSubmit}>
        <div>
            FromAccountId:
            <br />
            <input type="number" name="FromAccountId" onChange={handleChangeTransfer} />
          </div>
          <div>
            ToAccountId:
            <br />
            <input type="number" name="FromAccountId" onChange={handleChangeTransfer} />
          </div>
          <div>
            Pin :
            <br />
            <input type="number" name="Pin" onChange={handleChangeTransfer} />
          </div>
          <div>
            Amount Transfered:
            <br />
            <input type="number" name="AmountTransfer" onChange={handleChangeTransfer} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  };
  
  export default Transfer;
  