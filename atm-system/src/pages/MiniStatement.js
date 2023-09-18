import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect,useState } from "react";
import axios from "axios";

const MiniStatement = () =>{

    const [statement,setStatement] = useState([]);
    const [miniStatemtent,setMiniStatement]=useState({
        accountId:0,
        limit:Number.MAX_SAFE_INTEGER
    })
    const [Loading,setLoading] = useState(false);
    const getStatement = async() => {
        try{
        const getData= await axios.get(`https://localhost:7182/api/Transactionhistories/AccountId
?id=${miniStatemtent.accountId}&limit=${miniStatemtent.limit}`);
            setStatement(getData.data);
}
catch(err)
{
    console.log(err);
}
finally{
    setLoading(true);
}

       }

    const handleMiniStatement = (event) => {
        setMiniStatement({ ...miniStatemtent, [event.target.name]: event.target.value });
      };
    
  const handleSubmit = (event) => {

    event.preventDefault();
    getStatement();   
  };

 return (
    <>
      <h1>Statement Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
       AccountId
          <br />
          <input type="number" name="accountId" onChange={handleMiniStatement} />
        </div>
        <div>
        No of trasactions
          <br />
          <input type="number" name="limit" onChange={handleMiniStatement} />
        </div>
        <button type="submit">Submit</button>
      </form>
      
      {
    
        Loading ?(
                <div>
                    <table>
                        <thead>
                        <tr>
                        <th>DebitorId</th>
                        <th>CreditorId</th>
                        <th>Date</th>
                        <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        statement.map((st,index)=>(
                            
                            <tr key={index}>
                            <td>{st.debitorId}</td>
                            <td>{st.creditorId}</td>
                            <td>{new Date(st.transactionDate).toDateString()}</td>
                            <td>{st.amount}</td>
                            </tr>
                        ))
                    }
                        </tbody>
                    </table>
                </div>) : (<div></div>)
            }
       
      </>
 
  );
};

export default MiniStatement;
