import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
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
            alert(error.message);
        }
    }

    return (
        <Card className='login-wrapper'>
            <div className="login-form-image">
                abcd
            </div>
            <div className="login-form-wrapper">
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="login-input">
                    <label for="name">Username</label>
                    <input id="name" className="name" type="text" onChange={handleUsername} />
                </div>
                <div className="login-input">
                    <label for="password">Password</label>
                    <input id="password" type="password" onChange={handlepwd} />
                </div>
                <div>
                    <Button className="login-button" type="submit">Login </Button>
                </div>
            </form>
            </div>
        </Card>
    )
}

export default LoginPage;