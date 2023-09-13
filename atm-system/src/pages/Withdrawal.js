import { useState } from "react";
import axios from "axios";

const Withdrawal = () => {

  const [withdrawal, setWithdrawal] = useState({
    Pin:"",
    FromAccountId:"",
    AmountWithdrawn:""
  });

  const handleChangeWithdrawal = (event) => {
    setWithdrawal({ ...wthdrawal, [event.target.name]: event.target.value });
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
          <input type="text" name="FromAccountId" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          Pin :
          <br />
          <input type="text" name="Pin" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          AmountWithdrawn:
          <br />
          <input type="number" name="AmountWithdrawn" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          Withdrawal type:
          <br />
          <select type="text" name="WithdrawalType" onChange={handleChangeWithdrawal} >
            <option> Saving</option>
            <option>Current</option>
            <option>Salary</option>
          </select>
        </div>
        <div>
          City:
          <br />
          <input type="text" name="City" onChange={handleChangeWithdrawal} />
        </div>
        <div>
          Balance:
          <br />
          <input type="number" name="Balance" onChange={handleChangeWithdrawal} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default WithdrawalDetails;
