import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import logout from "../components/LogOut";

const PinChange = () => {
  const [user, setUser] = useContext(AuthContext);
  const [pin, setpin] = useState({
    OldPin: 0,
    Pin: 0,
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let token = eval(user);
  token = token.token;
  const headers = { "Authorization": `Bearer ` + token };
  const handleChangepin = (event) => {
    setpin({ ...pin, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(pin));
    setIsSubmit(true);
    
}
const validate = (values) => {
  const error = {};
  if(!values.OldPin){
      error.OldPin = "OldPin is required!";
  }
  else if(values.customerId.length != 4 ){
      error.customerId = "CustomerId must contain 4 digits";
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
      }

    }).catch((err) => {
      console.log(err);
      alert(err.response.data);
    })

  }
  },[errors]);


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