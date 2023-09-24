import axios from "axios";
import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout from "../components/LogOut";

const UserDetails = () => {

  const navigate = useNavigate();
    const[user,setUser] = useContext(AuthContext)
  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    EmailId: "",
    PhoneNumber: "",
    DateOfBirth: "",
  });
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
 

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.FirstName){
        error.FirstName = "FirstName is required!";
    }
    if(!values.EmailId){
        error.EmailId = "EmailId is required!";
    }
    else if(!regex.test(values.email) ){
        error.EmailId = "Enter a valid EmailId";
    }
    if(!values.PhoneNumber){
      error.PhoneNumber = "Phone Number is required!";
    }
    else if(values.PhoneNumber.length!=10){
      error.PhoneNumber = "Phone Number must contain 10 numbers";
    }
    return error;
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(customer));
    setIsSubmit(true);
    
}

  useEffect(() => {
    
    if (Object.keys(errors).length === 0 && isSubmit) {console.log(customer);
    let token = eval(user);
    token=token.token;
    const headers = {"Authorization":`Bearer `+token};
    console.log(headers);
    console.log(user);
    axios
      .post("https://localhost:7182/api/Customers", customer,{headers})
      .then((response) => {
        console.log(response);
        alert('User added successfully');
        navigate("/");

      })
      .catch((err) => {console.log(err);
      alert(err.response.data)
  });}
  },[errors]);

  return (
    <>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          First name:
          <br />
          <input type="text" name="FirstName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Last name:
          <br />
          <input type="text" name="LastName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Address:
          <br />
          <input type="text" name="Address" onChange={handleChangeCustomer} />
        </div>
        <div>
          Email:
          <br />
          <input type="email" name="EmailId" onChange={handleChangeCustomer} />
        </div>
        <div>
          Contact:
          <br />
          <input
            type="text"
            name="PhoneNumber"
            onChange={handleChangeCustomer}
          />
        </div>
        <div>
          Date of Birth:
          <br />
          <input
            type="date"
            name="DateOfBirth"
            onChange={handleChangeCustomer}
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default UserDetails;
