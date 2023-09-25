import axios from "axios";
import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logout from "../components/LogOut";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

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
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.FirstName){
        error.FirstName = "FirstName is required!";
    }
    if(!values.EmailId){
        error.EmailId = "Email Id is required!";
    }
    else if(!regex.test(values.EmailId) ){
        error.EmailId = "Enter a valid Email Id";
    }
    if(!values.PhoneNumber){
      error.PhoneNumber = "Phone Number is required!";
    }
    else if(values.PhoneNumber.length!=10){
      error.PhoneNumber = "Phone Number must contain 10 numbers";
    }
    if(!values.Address){
      error.Address = "Address is required!";
    }
    if(!values.DateOfBirth){
      error.DateOfBirth = "Date of Birth is required!";
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
    <Card>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          First name:
          <br />
          <Input type="text" name="FirstName" onChange={handleChangeCustomer} />
        </div>
        <p>{errors.FirstName}</p>
        <div>
          Last name:
          <br />
          <Input type="text" name="LastName" onChange={handleChangeCustomer} />
        </div>
        <p>{errors.LastName}</p>
        <div>
          Address:
          <br />
          <Input type="text" name="Address" onChange={handleChangeCustomer} />
        </div>
        <p>{errors.Address}</p>
        <div>
          Email:
          <br />
          <Input type="email" name="EmailId" onChange={handleChangeCustomer} />
        </div>
        <p>{errors.EmailId}</p>
        <div>
          Contact:
          <br />
          <Input
            type="text"
            name="PhoneNumber"
            onChange={handleChangeCustomer}
          />
        </div>
        <p>{errors.PhoneNumber}</p>
        <div>
          Date of Birth:
          <br />
          <Input
            type="date"
            name="DateOfBirth"
            onChange={handleChangeCustomer}
          />
        </div>
        <p>{errors.DateOfBirth}</p>
        
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default UserDetails;
