import { useState,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const ChangePassword = () => {

  const navigator = useNavigate();

  const[user,setUser] = useContext(AuthContext);
  const [password, setpassword] = useState({
    Newpassword:"",
    Oldpassword:"",
  });

  const headers = {"Authorization":`Bearer ${user.token}`};
  const handleChangepassword = (event) => {
    setpassword({ ...password, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(password);

    
            axios.post(`https://localhost:7182/api/Credentials/ChangePassword?OldPassword=${password.Oldpassword}&NewPassword=${password.Newpassword}`,{},{headers: headers}).then((response)=>{
        
            console.log(response);
              if(response.status==200)
                {
                    alert(response.data);
                    navigator('/');
                }
        
          }).catch((err)=>{console.log(err);
          alert(err.response.data)})
}
    

  return (
    <Card>
      <h1>Enter password Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Oldpassword :
          <br />
          <Input type="password" name="Oldpassword" onChange={handleChangepassword} />
        </div>
        <div>
         Newpassword:
          <br />
          <Input type="password" name="Newpassword" onChange={handleChangepassword} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </Card>
  );
};

export default ChangePassword;