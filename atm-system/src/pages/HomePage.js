import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import logout from '../components/LogOut';
import axios from 'axios';
import ChangePassword from "./ChangePassword";
import DisableUser from './DisableUser';
import EnableUser from './EnableUser';

const HomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(AuthContext);
    var balance;
    const [balanceShow, setBalanceShow] = useState('false');

    const userDetail = eval(user);
    let token = eval(user);
    token = token.token;
    const headers = { "Authorization": `Bearer ` + token };

    const handleBalanceShow = (event) => {
        console.log(balanceShow);
        setBalanceShow(!balanceShow);
        axios.get(`https://localhost:7182/api/Accounts/balance`, { headers: headers }).then((response) => {
            console.log(response.data);
            balance = response.data;
            alert(`Your account balance is ${balance}`);
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
        })
    }
    //Need to change it 

    if (userDetail.userType == 'Admin') {
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={() => navigate("/user")}>Add User</button>
                <br />
                <button onClick={() => navigate("/account")}>Add Account</button>               
                <br/>
                <button onClick={()=>navigate("/changepassword")}>Change Password</button>
                <br/>
                <button onClick={()=>navigate("/enableuser")}>Enable User</button>
                <br/>
                <button onClick={()=>navigate("/disableuser")}>Disable User</button>
                <br />
                <button onClick={logout}>LogOut</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>User Home Page</h1>
                <button onClick={() => navigate("/withdraw")}> Withdraw Money</button>
                <br />
                <button onClick={() => navigate("/deposit")}> Deposit Cheque</button>
                <br />
                <button onClick={() => navigate("/transfer")}>Fund Transfer</button>
                <br />
                <button onClick={handleBalanceShow}>Balance</button>
                <br />
                <button onClick={()=>navigate("/statement")}>Mini Statement</button>
                <br />
                <button onClick={() => navigate("/pinchange")}>Pin Change</button>
                <br/>
                <button onClick={()=>navigate("/changepassword")}>Change Password</button>
                <br />
                <button onClick={logout}>LogOut</button>
            </div>
        )
    }
}

export default HomePage;