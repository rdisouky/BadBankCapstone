import { useEffect, useContext, useState } from "react";
import {getAllData} from '../api/index';
import { AuthContext } from '../auth';
const AllData = () => {
    const [transactions, setTransactions] = useState([{"hi":"hi"}]);
    const {currentUser} = useContext(AuthContext); 
    useEffect(() => {
        console.log('uid', currentUser.uid)
        setTransactions(getAllData(currentUser.uid));
    }, [currentUser.uid]);
    
    return (
        <div>
            <h1>AllData</h1>
            {/* {transactions.map((transaction) => 
                 <p>{transaction}</p>
            )} */}
        </div>
    )
};

export default AllData