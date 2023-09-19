import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"
const LoginPage = () => {

    const [user,setUser] = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pwd, setpwd] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlepwd = (event) => {
        setpwd(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post('https://localhost:7182/api/Credentials', {
             userName:username,
                password: pwd
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
            alert(error);
        }
    }

    return (
        <div className="login-wrapper">
            <form className='login-form' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="login-input">
                    <div className="name">Username:</div>
                    <input type="text" onChange={handleUsername} />
                </div>
                <div className="login-input">
                    <div for="password">Password:</div>
                    <input type="password" onChange={handlepwd} />
                </div>
                <div>
                    <button type="submit">Login </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;