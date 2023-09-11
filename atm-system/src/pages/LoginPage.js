import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        setUser({username:username,password:pwd})
        navigate("/")
        try {
            axios.post('https://localhost:7282/api/Login', {
                email: username,
                pwd: pwd
            }).then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    alert(`Welcome ${response.data.cname}`);
                }
                else {
                    alert("Auth failed");
                }

            }).catch((err)=>console.log(err))
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
        </div>
    )
}

export default LoginPage;