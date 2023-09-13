import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Home Page</h1>
            <button onClick={()=>navigate("/user")}>Add User</button>
            <button onClick={()=>navigate("/accout")}>Add Account</button>
        </>

    )
}

export default HomePage;