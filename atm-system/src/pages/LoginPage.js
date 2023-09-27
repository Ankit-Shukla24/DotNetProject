import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";

const LoginPage = () => {

    const [user,setUser] = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentialValues, setCredentialValues] = useState({
        username:"",
        password:""
    });
    const [errors,setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentialValues({...credentialValues,[name]:value});
    }

    const validate = (values) => {
        const error = {};
        console.log(values);
        if(!values.username){
            error.username = "Username is required";
        }
        if(!values.password){
            error.password = "Password is required";
        }
        else if(values.password.length <4 ){
            error.password = "Password must be more than 3 characters";
        }
        else if(values.password.length >10 ){
            error.password = "Password cannot exceed 10 characters";
        }
        return error;
    }
    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmit) {
            try {
            
                axios.post('https://localhost:7182/api/Credentials', {
                 username: credentialValues.username,
                 password: credentialValues.password
                }).then((response) => {
                    if (response.status == 200) {
                        setUser(response.data);
                        localStorage.setItem("userCredentials",JSON.stringify(response.data));
                        alert(`Welcome ${response.data.userId}`);
                        navigate("/");
                    }
                    else {
                        console.log(response);
                        alert(response.data);
                    }
    
                })
                .catch((err)=> {
                  alert(err.response.data)
                })
            }
            catch (error) {
                alert(error.response.data);
            }
        }
      }, [errors]);

      
    const handleSubmit =  (event) => {
        event.preventDefault();
        console.log(credentialValues)
        setErrors(validate(credentialValues));
        setIsSubmit(true);
        
    }

  return (
    <div className="login-page">
      <div className="left-content">
        <h1>Wellsman Forgan</h1>
        <p>Money. Take it or leave it. Or transfer it.</p>
      </div>
      <div className="right-content">
        <Card>
          <div className="card-header">Login</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Input type="text" name="username" onChange={handleChange} />
            </div>
            <p className="error-message">{errors.username}</p>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Input type="password" name="password" onChange={handleChange} />
            </div>
            <p className="error-message">{errors.password}</p>
            <div className="button-container">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
