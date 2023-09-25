import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import { useNavigate } from "react-router-dom";

const PinChange = () => {
  const [user, setUser] = useContext(AuthContext);
  const [pin, setpin] = useState({
    OldPin: 0,
    Pin: 0,
  });

  const navigate = useNavigate();

  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  const handleChangepin = (event) => {
    setpin({ ...pin, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log(pin);


    axios.post(` https://localhost:7182/api/Accounts/changePin?oldPin=${pin.OldPin}&newPin=${pin.Pin}`, {}, { headers: headers }).then((response) => {

      console.log(response);
      if (response.status == 200) {
        alert(response.data);
        navigate('/');
      }

    }).catch((err) => {
      console.log(err);
      alert(err.response.data);
    })


  }


  return (
    <>
      <h1>Enter Pin Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          OldPin :
          <br />
          <input type="number" name="OldPin" onChange={handleChangepin} />
        </div>
        <div>
          NewPin:
          <br />
          <input type="number" name="Pin" onChange={handleChangepin} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default PinChange;