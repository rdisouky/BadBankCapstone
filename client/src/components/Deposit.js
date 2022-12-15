import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth';
import {deposit} from '../api/index';


const Deposit = () => {
    const [show, setShow] = React.useState(true);
    const [depositAmount, setDeposit] = React.useState('');
    const [depositMessage, setDepositMessage] = React.useState('');
    const {currentUser} = React.useContext(AuthContext); 
    // const ctx = React.useContext(UserContext);
    
    const handleDeposit = () => {
        console.log("Deposit button clicked", currentUser.uid, depositAmount);
        deposit(currentUser.uid, depositAmount);
    //   const money = parseInt(deposit)
    //   if(money && money > 0){
    //     if(!ctx.user.balance) {
    //       ctx.user.balance=money;
    //     }
    //     else {
    //       ctx.user.balance += money;
    //     }
    //     ctx.records.unshift({
    //       transationType:'Deposit', 
    //       transactionMessage:`${ctx.user.name} deposited ${money} amount`,
    //       balance: ctx.user.balance
    //     });
    //     setShow(false);
    //   }
    //   else if (money <= 0) {
    //     setDepositMessage('Deposit must be a positive dollar amount'); 
    //   }
    //   else {
    //     setDepositMessage('Deposit must be a dollar amount');
    //   }
    }
    
    const clearForm = () => {
    setDeposit('');
    setShow(true);
    setDepositMessage('')
    }
    
    return(
        <Card style={{height:'25rem', width:'25rem'}} bg={'dark'} text={'light'}>
            <Card.Header>{`Deposit, Current Balance ${0}`}</Card.Header>
            <Card.Body>
                <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Deposit amount"
                    aria-label="Deposit amount"
                    aria-describedby="basic-addon1"
                    onChange={e => setDeposit(e.currentTarget.value)}
                />
                </InputGroup>
                <Button variant="primary" onClick={handleDeposit}>Deposit</Button>
            </Card.Body>
        </Card>
    );
    // return(
    //   <Card
    //     bgcolor="dark"
    //     header={`Deposit, Current Balance ${0}`}
    //     body={show ? (
    //       <>
    //       Deposit<br/>
    //       <input type="input" className="form-control" id="deposit"
    //       placeholder="Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
    //        <div style={{ width: '100%', marginLeft: '10px', color: 'red' }}>{depositMessage}</div>
    //       <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={deposit === ''}>Deposit</button>
    //       </>
    //     ):(
    
    //       <>
    //       <h5>Thank you for your Deposit!</h5>
    //       <button type="submit" className="btn btn-light" onClick={clearForm}>Deposit Again</button>
    //       </>
    //     )}
        
    //     />
    // )
};

export default Deposit