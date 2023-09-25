import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";

const LoginPage = () => {
  const [user, setUser] = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setpwd] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlepwd = (event) => {
    setpwd(event.target.value);
  };
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
    } catch (error) {
      alert(error.response.data);
    }
  };

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
              <Input type="text" id="username" onChange={handleUsername} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Input type="password" id="password" onChange={handlepwd} />
            </div>
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
