import axios from "axios";
import { useContext,useState } from "react";
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

 

  const handleChangeCustomer = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };



  const handleSubmit = (event) => {
    

    event.preventDefault();
    console.log(customer);
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
  });
  };

  return (
    <Card>
      <h1>Enter User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          First name:
          <br />
          <Input type="text" name="FirstName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Last name:
          <br />
          <Input type="text" name="LastName" onChange={handleChangeCustomer} />
        </div>
        <div>
          Address:
          <br />
          <Input type="text" name="Address" onChange={handleChangeCustomer} />
        </div>
        <div>
          Email:
          <br />
          <Input type="email" name="EmailId" onChange={handleChangeCustomer} />
        </div>
        <div>
          Contact:
          <br />
          <Input
            type="text"
            name="PhoneNumber"
            onChange={handleChangeCustomer}
          />
        </div>
        <div>
          Date of Birth:
          <br />
          <Input
            type="date"
            name="DateOfBirth"
            onChange={handleChangeCustomer}
          />
        </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default UserDetails;
