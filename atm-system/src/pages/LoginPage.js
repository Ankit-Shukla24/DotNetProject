import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";

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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username:<input type="text" onChange={handleUsername} />
                </div>
                <div>
                    Password:<input type="password" onChange={handlepwd} />
                </div>
                <div>
                    <button type="submit">Login </button>
                </div>
            </form>
            <button onClick={()=>navigate("/changepassword")}>Change Password</button>
        </div>
    )
}

export default LoginPage;