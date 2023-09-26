import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const PinChange = () => {
  const [user, setUser] = useContext(AuthContext);
  const [pin, setpin] = useState({
    OldPin: 0,
    Pin: 0,
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const headers = { "Authorization": `Bearer ${user.token}` };
  const navigate = useNavigate();
  const handleChangepin = (event) => {
    setpin({ ...pin, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    setErrors(validate(pin));
    setIsSubmit(true);
    
}
const validate = (values) => {
  const error = {};
  if(!values.OldPin){
      error.OldPin = "Old Pin is required!";
  }
  else if(values.OldPin.length != 4 ){
      error.OldPin = "Pin must contain 4 digits";
  }
  if(!values.Pin){
    error.Pin = " New Pin is required!";
}
else if(values.Pin.length != 4 ){
    error.Pin = "New Pin must contain 4 digits";
}
  return error;
}
  useEffect(() => {

    
    if (Object.keys(errors).length === 0 && isSubmit) {
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
  },[errors]);


  return (
    <Card>
      <h1>Change Pin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Old Pin
          <br />
          <Input type="number" name="OldPin" onChange={handleChangepin} />
        </div>
        <p>{errors.OldPin}</p>
        <div>
          New Pin
          <br />
          <Input type="number" name="Pin" onChange={handleChangepin} />
        </div>
        <p>{errors.Pin}</p>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default PinChange;
