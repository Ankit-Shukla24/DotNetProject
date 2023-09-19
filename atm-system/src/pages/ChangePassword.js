import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const ChangePassword = () => {
  const[user,setUser] = useContext(AuthContext);
  const [password, setpassword] = useState({
    Oldpassword:"",
    password:"",
    userName:"",
  });
  let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
  const handleChangepassword = (event) => {
    setpassword({ ...password, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(password);

    axios.get(`https://localhost:7182/api/Credentials/${password.userName}`,{headers}).then((response)=>{
    console.log(response);
    if(response.data.password==password.Oldpassword)
        {
            axios.post(`https://localhost:7182/api/Credentials/password?accountNumber=${password.userName}&password=${password.password}`,{headers}).then((response)=>{
        
            console.log(response);
              if(response.status==200)
                {
                    alert(response.data);
                }
        
          }).catch((err)=>{console.log(err);
          alert(err.message)})
        }
    else{
        alert("Wrong password");
    }
  
    }).catch((err)=>{console.log(err); 
        alert(err.message)})
}
    

  return (
    <>
      <h1>Enter password Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
        Username:
          <br />
          <input type="text" name="userName" onChange={handleChangepassword} />
        </div>
        <div>
          Oldpassword :
          <br />
          <input type="password" name="Oldpassword" onChange={handleChangepassword} />
        </div>
        <div>
         Newpassword:
          <br />
          <input type="password" name="password" onChange={handleChangepassword} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default ChangePassword;