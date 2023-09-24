import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        if(!values.username){
            error.username = "UserName is required!";
        }
        if(!values.password){
            error.password = "Password is required!";
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
                 userName:credentialValues.username,
                    password:credentialValues.password
                }).then((response) => {
                    if (response.status == 200) {
                        setUser(response.data);
                        localStorage.setItem("userCredentials",JSON.stringify(response.data));
                        alert(`Welcome ${response.data.userId}`);
                        navigate("/");
                    }
                    else {
                        alert("Auth failed");
                    }
    
                })
            }
            catch (error) {
                alert(error.response.data);
            }
        }
      }, [errors]);

      
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(validate(credentialValues));
        setIsSubmit(true);
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username:<input type="text" name = "username" onChange={handleChange} />
                </div>
                <p>{errors.username}</p>
                <div>
                    Password:<input type="password" name = "password" onChange={handleChange} />
                </div>
                <p>{errors.password}</p>
                <div>
                    <button type="submit">Login </button>
                </div>
            </form>
            
        </div>
    )
}

export default LoginPage;