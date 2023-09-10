import {useState} from "react";
import axios from "axios";

const UserDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [date,setDate] = useState();

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

    const handleSubmit = (event) => {
        const payload = {
            firstName : firstName, 
            lastName: lastName,
            address: address,
            email: email,
            contact: contact,
            date: date,
        }
        console.log({firstName,lastName,address,email,contact,date})
        //axios.post("",payload).then((response)=>{console.log(response)}) ;
        event.preventDefault();
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
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default UserDetails;