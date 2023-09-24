import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

const PinChange = () => {
  const [user, setUser] = useContext(AuthContext);
  const [pin, setpin] = useState({
    OldPin: 0,
    Pin: 0,
  });
  // let token = eval(user);
  // token = token.token;
  // const headers = { "Authorization": `Bearer ` + token };
  const handleChangepin = (event) => {
    setpin({ ...pin, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(pin);

    // axios.post(` https://localhost:7182/api/Accounts/changePin?oldPin=${pin.OldPin}&newPin=${pin.Pin}`, {}, { headers: headers }).then((response) => {

    //   console.log(response);
    //   if (response.status == 200) {
    //     alert(response.data);
    //   }

    // }).catch((err) => {
    //   console.log(err);
    //   alert(err.response.data);
    // })
  };

  return (
    <Card>
      <h1>Enter Pin Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Old Pin
          <br />
          <Input type="number" name="OldPin" onChange={handleChangepin} />
        </div>
        <div>
          New Pin
          <br />
          <Input type="number" name="Pin" onChange={handleChangepin} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default PinChange;
