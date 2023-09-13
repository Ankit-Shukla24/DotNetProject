import { useState } from "react";
import axios from "axios";

const Withdrawal = () => {

  const [withdrawal, setWithdrawal] = useState({
    Pin:"",
    FromAccountId:"",
    AmountWithdrawn:""
  });

  const handleChangeWithdrawal = (event) => {
    setWithdrawal({ ...withdrawal, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    
    console.log(withdrawal);
    axios
      .post("https://localhost:7182/api/Withdrawals", withdrawal)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Enter Withdrawal Details</h1>
      <form onSubmit={handleSubmit}>
      <div>
          FromAccountId:
          <br />
          <input type="number" name="FromAccountId" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          Pin :
          <br />
          <input type="number" name="Pin" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          AmountWithdrawn:
          <br />
          <input type="number" name="AmountWithdrawn" onChange={handleChangeWithdrawal} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Withdrawal;
