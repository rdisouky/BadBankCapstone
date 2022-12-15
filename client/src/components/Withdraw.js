import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {withdraw} from '../api/index';
import { AuthContext } from '../auth';


const Withdraw = () => {
    const [show, setShow] = React.useState(true);
    const [withdrawAmount, setWithdraw] = React.useState('');
    const [withdrawMessage, setWithdrawtMessage] = React.useState('');
    // const ctx = React.useContext(UserContext);
    const {currentUser} = React.useContext(AuthContext); 

const handleWithdraw = () => {
    console.log("Withdraw button clicked", currentUser.uid, withdrawAmount);
    withdraw(currentUser.uid, withdrawAmount);
//   const money = parseInt(withdraw)
//   if(money && money > 0){
//     if(!ctx.user.balance || ctx.user.balance-money < 0) {
//       setWithdrawtMessage('Account cannot be in overdraft');
//       return;
//     }
//     ctx.user.balance -= money;
//     ctx.records.unshift({
//       transationType:'Withdraw', 
//       transactionMessage:`${ctx.user.name} withdrew ${money} amount`,
//       balance: ctx.user.balance
//     });
//     setShow(false);
//   }
//   else if (money <= 0) {
//     setWithdrawtMessage('Withdraw must be a positive dollar amount'); 
//   }
//   else {
//     setWithdrawtMessage('Withdraw must be a dollar amount');
//   }
}

function clearForm(){
setWithdraw('');
setShow(true);
setWithdrawtMessage('')
}

return(
    <Card style={{height:'25rem', width:'25rem'}} bg={'warning'} text={'light'}>
    <Card.Header>{`Withdraw, Current Balance ${0}`}</Card.Header>
    <Card.Body>
        <InputGroup className="mb-3">
        <Form.Control
            placeholder="Withdraw amount"
            aria-label="Withdraw amount"
            aria-describedby="basic-addon1"
            onChange={e => setWithdraw(e.currentTarget.value)}
        />
        </InputGroup>
        <Button variant="primary" onClick={handleWithdraw}>Withdraw</Button>
    </Card.Body>
</Card>
//   <Card
//     bgcolor="warning"
//     header={`Withdraw, Current Balance ${0}`}
//     body={show ? (
//       <>
//       Withdraw<br/>
//       <input type="input" className="form-control" id="withdraw"
//       placeholder="Withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} /><br/>
//        <div style={{ width: '100%', marginLeft: '10px', color: 'red' }}>{withdrawMessage}</div>
//       <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={withdraw===''}>Withdraw</button>
//       </>
//     ):(

//       <>
//       <h5>Take your Money!</h5>
//       <button type="submit" className="btn btn-light" onClick={clearForm}>Withdraw Again</button>
//       </>
//     )}
    
//     />
)
};

export default Withdraw