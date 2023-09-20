import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const ChangePassword = () => {
  const[user,setUser] = useContext(AuthContext);
  const [password, setpassword] = useState({
    Oldpassword:"",
    Newpassword:"",
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

    
            axios.post(`https://localhost:7182/api/Credentials/ChangePassword?UserName=${password.userName}&OldPassword=${password.Oldpassword}&NewPassword=${password.Newpassword}`,{headers}).then((response)=>{
        
            console.log(response);
              if(response.status==200)
                {
                    alert(response.data);
                }
        
          }).catch((err)=>{console.log(err);
          alert(err.response.data)})
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
          <input type="password" name="Newpassword" onChange={handleChangepassword} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default ChangePassword;