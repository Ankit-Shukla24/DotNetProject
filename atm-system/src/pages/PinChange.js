import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const PinChange = () => {
  const[user,setUser] = useContext(AuthContext);
  const [pin, setpin] = useState({
    OldPin:0,
    Pin:0,
    accountNumber:0,
  });
  let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
  const handleChangepin = (event) => {
    setpin({ ...pin, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(pin);

    axios.get(`https://localhost:7182/api/Accounts/${pin.accountNumber}`,{headers}).then((response)=>{
    console.log(response);
    if(response.data.pin==pin.OldPin)
        {
            axios.post(`https://localhost:7182/api/Accounts/pin?accountNumber=${pin.accountNumber}&pin=${pin.Pin}`,{headers}).then((response)=>{
        
            console.log(response);
              if(response.status==200)
                {
                    alert("Pin Updated Successfully");
                }
        
          }).catch((err)=>{console.log(err);
          alert(err.message)})
        }
    else{
        alert("Wrong Pin");
    }
  
    }).catch((err)=>{console.log(err); 
        alert(err.message)})
}
    

  return (
    <>
      <h1>Enter Pin Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
        AccountId:
          <br />
          <input type="number" name="accountNumber" onChange={handleChangepin} />
        </div>
        <div>
          OldPin :
          <br />
          <input type="number" name="OldPin" onChange={handleChangepin} />
        </div>
        <div>
         NewPin:
          <br />
          <input type="number" name="Pin" onChange={handleChangepin} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default PinChange;