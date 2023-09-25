import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import "../styles/MiniStatement.css";

const MiniStatement = () => {
  const [statement, setStatement] = useState([]);
  const [miniStatemtent, setMiniStatement] = useState({
    limit: Number.MAX_SAFE_INTEGER,
  });

  const [user, setUser] = useContext(AuthContext);
  const [errors,setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const headers = {"Authorization":`Bearer ${user.token}`};

  const [Loading, setLoading] = useState(false);
  const getStatement = async () => {
    try{
    const getData= await axios.get(`https://localhost:7182/api/Transactionhistories/statement?limit=${miniStatemtent.limit}`,{ headers: headers });
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
    if(!values.limit){
        error.limit = "limit is required!";
    }
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
      <h1>Statement Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          No of transactions
          <br />
          <Input type="number" name="limit" onChange={handleMiniStatement} />
        </div>
        <p>{errors.limit}</p>
        <button type="submit">Submit</button>
      </form>

      {Loading ? (
        <div className="statement-table">
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
              {statement.map((st, index) => (
                <tr key={index}>
                  <td>{st.debitorId}</td>
                  <td>{st.creditorId}</td>
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
