import axios from "axios";
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout from "../components/LogOut";
import V from "max-validator";

const EnableUser = () => {

  const navigate = useNavigate();
    const[user,setUser] = useContext(AuthContext)
  const [customer, setCustomer] = useState({
    customerId : 0
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(customer));
    setIsSubmit(true);
    
}
const validate = (values) => {
  const error = {};
  if(!values.customerId){
      error.customerId = "CustomerId is required!";
  }
  else if(values.customerId.length != 3 ){
      error.customerId = "CustomerId must contain 3 digits";
  }
  return error;
}

  useEffect(() => {

    if (Object.keys(errors).length === 0 && isSubmit){
      console.log(customer);
    
    let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
    console.log(headers);
    
    axios
      .post(`https://localhost:7182/api/Credentials/activity?customerId=${customer.customerId}&status=true`,{},{headers})
      .then((response) => {
        console.log(response);
        alert('User Enabled successfully');
        navigate("/");

      })
      .catch((err) => {console.log(err);
      
  });
}
  },[errors]);

  return (
    <>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          CustomerId :
          <br />
          <input type="number" name="customerId" onChange={handleChangeCustomer} />
        </div>  
        <p>{errors.customerId}</p>      
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default EnableUser;
