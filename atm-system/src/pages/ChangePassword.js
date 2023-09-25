import { useState,useContext, useEffect } from "react";
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
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const headers = {"Authorization":`Bearer ${user.token}`};

  const handleChangepassword = (event) => {
    setpassword({ ...password, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    if(!values.Oldpassword){
        error.Oldpassword = "Old  Password is required!";
    }
    if(!values.Newpassword){
        error.Newpassword = "New Password is required!";
    }
    else if(values.Newpassword.length <4 ){
        error.Newpassword = "Password must be more than 3 characters";
    }
    else if(values.Newpassword.length >10 ){
        error.Newpassword = "Password cannot exceed 10 characters";
    }
    return error;
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(password));
    setIsSubmit(true);
    
  }
  useEffect(() => {
   
    if (Object.keys(errors).length === 0 && isSubmit){
      console.log(password);
            axios.post(`https://localhost:7182/api/Credentials/ChangePassword?OldPassword=${password.Oldpassword}&NewPassword=${password.Newpassword}`,{},{headers: headers}).then((response)=>{
        
            console.log(response);
              if(response.status==200)
                {
                    alert(response.data);
                    navigator('/');
                }
        
          }).catch((err)=>{console.log(err);
          alert(err.response.data)})}
},[errors]);
    

  return (
    <Card>
      <h1>Enter password Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Oldpassword :
          <br />
          <Input type="password" name="Oldpassword" onChange={handleChangepassword} />
        </div>
        <p>{errors.Oldpassword}</p>
        <div>
         Newpassword:
          <br />
          <Input type="password" name="Newpassword" onChange={handleChangepassword} />
        </div>
        <p>{errors.Newpassword}</p>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </Card>
  );
};

export default ChangePassword;