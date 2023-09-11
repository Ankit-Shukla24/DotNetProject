import {useState} from "react";
import axios from "axios";

const UserDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [date,setDate] = useState();
    const [cardNumber,setCardNumber] = useState();
    const [pin,setPin] = useState();
    const [city,setCity] = useState();
    const [accountType,setAccountType] = useState();
    const [balance,setBalance] = useState();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleContactChange = (event) => {
        setContact(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const handleCardNumberChange = (event) =>{
        setCardNumber(event.target.value);
    }
    const handlePinChange = (event) =>{
        setPin(event.target.value);
    }
    const handleAccountTypeChange = (event) =>{
        setAccountType(event.target.value);
    }
    const handleCityChange= (event) =>{
        setCity(event.target.value);
    }
    const handleBalanceChange=(event)=>{
        setBalance(event.target.value);
    }

    const handleSubmit = (event) => {

        const account ={
            AccountType:accountType,
            Pin:pin,
            CardNo:cardNumber,
            City:city,
            Balance:balance
        }

        const payload = {
            FirstName : firstName, 
            LastName: lastName,
            Address: address,
            EmailId: email,
            PhoneNumber: contact,
            DateOfBirth: date,
            Accounts : [account]
        }
      
        event.preventDefault();
        console.log({firstName,lastName,address,email,contact,date})
        axios.post('https://localhost:7182/api/Customers',payload).then((response)=>{console.log(response)}).catch(err => console.log(err)) ;
        
    }

    return (
        <>
            <h1>Enter User Details</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    First name:
                    <br/>
                    <input onChange={handleFirstNameChange} type = "text"/>
                </div>
                <div>
                    Last name:
                    <br/>
                    <input type="text" onChange={handleLastNameChange}/>
                </div>
                <div>
                    Address:
                    <br/>
                    <input type="text" onChange={handleAddressChange}/>
                </div>
                <div>
                    Email:
                    <br/>
                    <input type="email" onChange={handleEmailChange}/>
                </div>
                <div>
                    Contact:
                    <br/>
                    <input type="text" onChange={handleContactChange}/>
                </div>
                <div>
                    Date of Birth:
                    <br/>
                    <input type="date" onChange={handleDateChange}/>
                </div>
                <div>
                    Card Number:
                    <br/>
                    <input type="text" onChange={handleCardNumberChange}/>
                </div>
                <div>
                    Pin:
                    <br/>
                    <input type="number" onChange={handlePinChange}/>
                </div>
                <div>
                    Account type:
                    <br/>
                    <input type="text" onChange={handleAccountTypeChange}/>
                </div>
                <div>
                    City:
                    <br/>
                    <input type="text" onChange={handleCityChange}/>
                </div>
                <div>
                    Balance:
                    <br/>
                    <input type="number" onChange={handleBalanceChange}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default UserDetails;