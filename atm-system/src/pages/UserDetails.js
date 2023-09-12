import { useState } from "react";
import axios from "axios";

const UserDetails = () => {
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
    
    axios
      .post("https://localhost:7182/api/Customers", customer)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

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
    </>
  );
};

export default UserDetails;
