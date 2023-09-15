import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>User Home Page</h1>
            <button onClick={()=>navigate("/withdraw")}> Withdraw Money</button>
            <br/>
            <button onClick={()=>navigate("/transfer")}>Fund Transfer</button>
            <br/>
            <button onClick={()=>navigate("/deposit")}>Check Deposit</button>
        </>

    )
}

export default UserHomePage;