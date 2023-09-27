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
  
  const calculate_age = (dateofbirth) => {
    var today = new Date();
    var dob = new Date(dateofbirth)  
    var age_now = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }

  const validate = (values) => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPhoneNumber = /^\d{10}$/;
    if(!values.FirstName){
        error.FirstName = "First name is required";
    }
    if(!values.EmailId){
        error.EmailId = "Email id is required";
    }
    else if(!regex.test(values.EmailId)){
        error.EmailId = "Enter a valid email id";
    }
    if(!values.PhoneNumber){
      error.PhoneNumber = "Phone number is required";
    } 
    else if(values.PhoneNumber.length!=10){
      error.PhoneNumber = "Phone number must contain 10 numbers";
    }
    else if(!regexPhoneNumber.test(values.PhoneNumber)){
      error.PhoneNumber = "Phone number must contain digits only";
    }
    if(!values.Address){
      error.Address = "Address is required";
    }
    if(!values.DateOfBirth){
      error.DateOfBirth = "Date of birth is required";
    }
    else if(calculate_age(values.DateOfBirth) < 18){
      error.DateOfBirth = "Age of the user should be greater than 18";
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
      alert(JSON.stringify(err.response.data.errors));
  });}
  },[errors]);

  return (
    <Card>
      <h1 className="card-header">Enter User Details</h1>
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
        <p className="error-message">{errors.LastName}</p>
        <div>
          Address:
          <br />
          <Input type="text" name="Address" onChange={handleChangeCustomer} />
        </div>
        <p className="error-message">{errors.Address}</p>
        <div>
          Email:
          <br />
          <Input type="email" name="EmailId" onChange={handleChangeCustomer} />
        </div>
        <p className="error-message">{errors.EmailId}</p>
        <div>
          Contact:
          <br />
          <Input
            type="text"
            name="PhoneNumber"
            onChange={handleChangeCustomer}
          />
        </div>
        <p className="error-message">{errors.PhoneNumber}</p>
        <div>
          Date of Birth:
          <br />
          <Input
            type="date"
            name="DateOfBirth"
            onChange={handleChangeCustomer}
          />
        </div>
        <p className="error-message">{errors.DateOfBirth}</p>
        <div className="button-container"><Button type="submit">Submit</Button></div>
      </form>
    </Card>
  );
};

export default UserDetails;
