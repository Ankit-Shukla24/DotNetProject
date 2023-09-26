import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import "../styles/MiniStatement.css";

const MiniStatement = ({id}) => {
  const [statement, setStatement] = useState([]);
  const [miniStatemtent, setMiniStatement] = useState({
    limit: 10,
  });

  const [user, setUser] = useContext(AuthContext);
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const headers = {"Authorization":`Bearer ${user.token}`};

  const [Loading, setLoading] = useState(false);
  const getStatement = async () => {
    try{
    const getData= await axios.get(`https://localhost:7182/api/Transactionhistories/statement?cus=${id?id:parseInt(JSON.parse(localStorage.getItem("userCredentials")).customerId)}&limit=${miniStatemtent.limit}`,{ headers: headers });
        setStatement(getData.data);
    }
    catch(err)
    {
        console.log(err);
        alert(err.response.data)
    }
    finally{
        setLoading(true);
    }
  };

  const handleMiniStatement = (event) => {
    setMiniStatement({
      ...miniStatemtent,
      [event.target.name]: event.target.value,
    });
  };
  const validate = (values) => {
    const error = {};
    return error;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(miniStatemtent));
    setIsSubmit(true);
    
}

useEffect(() => {
  if (Object.keys(errors).length === 0 && isSubmit){
    getStatement();
  }   
},[errors]);

  return (
    <Card> 
      <h1 className="card-header">Statement Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Number of Transactions
          <br />
          <Input value={miniStatemtent.limit} type="number" name="limit" onChange={handleMiniStatement} />
        </div>
        <p>{errors.limit}</p>
        <Button type="submit">Submit</Button>
      </form>

      {Loading ? statement.length ===0 ? (<><h2 style={{textAlign:"center"}}>No transactions to display</h2></>):(
        <div className="statement-table">
          <table>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Creditor ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {statement.map((st, index) => (
                <tr key={index}>
                  <td>{st.debitorId ? st.creditorId ? "Transfer": "Withdrawl":"Deposit"}</td>
                  <td>{st.creditorId ??"-"}</td>
                  <td>{new Date(st.transactionDate).toDateString()}</td>
                  <td>{st.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </Card>
  );
};

export default MiniStatement;
