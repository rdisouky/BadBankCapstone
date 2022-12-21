import { useEffect, useContext, useState } from "react";
import {getAllData} from '../api/index';
import { AuthContext } from '../auth';
const AllData = () => {
    const [transactions, setTransactions] = useState([]);
    const {currentUser} = useContext(AuthContext); 

    const getTransactions = async () => {
        const response = await getAllData(currentUser.uid);
        if(response.status === 200) {
            setTransactions(response.data.transactions);
        }
    };
    useEffect(() => {
        getTransactions();
    }, []);

    const title = () => {
        return (
          <>
          <div className="card-header">
          <h1>Account History</h1>
        </div>
        </>
        )
      }

      const columns = () => {
        return (
          <>
          <div className="card-group">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Transation Type</h5>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Amount</h5>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">New Balance</h5>
        </div>
      </div>
      </div>
      </>
        )
      }

    const card = (transationType, transactionMessage, balance) => {
        return (
          <div className="card-group">
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">{transationType}</h5>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">{transactionMessage}</h5>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">${balance}</h5>
        </div>
      </div>
      </div>
        )}

    if(transactions && transactions.length === 0) {
      return (
        <>
        {title()}
        <h1>No Transactions</h1>
        </>
      )
    }
    
    return (
    <>
    {title()}
    {columns()}
   {transactions.map(transaction => card(transaction.service, transaction.amount,transaction.new_balance)) }
   </>
  );
};

export default AllData