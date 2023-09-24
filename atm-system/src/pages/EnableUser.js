import axios from "axios";
import { useContext,useState } from "react";
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

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };



  const handleSubmit = (event) => {
    

    event.preventDefault();
    
    V.setMessages(
        {required: "This field is required",
        numeric: "Enter a Number",
         min: "Atleast 3 numbers required in this field"}
    );
    const result = V.validate(customer,{
        customerId : 'required|numeric|min:3',
    });
    
    console.log(result.isError('customerId','required'));
    console.log(result.isError('customerId','numeric'));
    console.log(result.isError('customerId','min'));
    console.log(customer);
    console.log(user.userType);
    let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
    console.log(headers);
    
    axios
      .post("https://localhost:7182/api/Credentials/activity?status=true",{},{headers})
      .then((response) => {
        console.log(response);
        alert('User Disabled successfully');
        navigate("/");

      })
      .catch((err) => {console.log(err);
      alert(err.response.data)
  });
  };

  return (
    <>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          CustomerId :
          <br />
          <input type="number" name="customerId" onChange={handleChangeCustomer} />
        </div>        
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default EnableUser;
