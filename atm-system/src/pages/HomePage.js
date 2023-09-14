import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const HomePage = () => {
    const navigate = useNavigate();
    const [user,setUser] = useContext(AuthContext);
    var balance;
    const [balanceShow,setBalanceShow] = useState('false');
   
     const userDetail= eval(user);
    const handleBalanceShow = (event) =>{
        console.log(balanceShow);
        setBalanceShow(!balanceShow);
        axios.get(`https://localhost:7182/api/Accounts/acc/${user.customerId}`).then((response)=>{
    console.log(response.data[0]);
        balance = response.data[0].balance;
        alert("Account:"+response.data[0].accountId+"\n"+"Balance:"+balance);
    }).catch((err)=>console.log(err))
    }
    //Need to change it 

        if(userDetail.UserType=='Admin')
        {      
            return(
        <div>
            <h1>Home Page</h1>
            <button onClick={()=>navigate("/user")}>Add User</button>
            <br/>
            <button onClick={()=>navigate("/account")}>Add Account</button>
        </div>
            )}
        else
        {
            return(
            <div>
            <h1>User Home Page</h1>
            <button onClick={()=>navigate("/withdraw")}> Withdraw Money</button>
            <br/>
            <button onClick={()=>navigate("/transfer")}>Fund Transfer</button>
            <button onClick={handleBalanceShow}>Balance</button>
            </div>
        )}
            }

export default HomePage;