import {useState, useContext, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {withdraw, balance} from '../api/index';
import { AuthContext } from '../auth';
import { Formik } from 'formik';



const Withdraw = () => {
    const [apiErrorMessage, setAPIErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [balanceAmount, setBalance] = useState(0);
    const {currentUser} = useContext(AuthContext); 

    const getBalance = async () => {
        const response = await balance(currentUser.uid);
        if(response.status === 200) {
            setBalance(response.data.balance);
        }
    };
    useEffect(() => {
        getBalance();
    }, []);

const handleWithdraw = async (withdrawal_amount) => {
    try {
    const response = await withdraw(currentUser.uid, withdrawal_amount);
    if(response && response.status === 200) {
        setShowMessage(true);
        setBalance(response.data.new_balance);
    }
    } catch(error) {
    setAPIErrorMessage(error.response.data.message)
    }
}

const withdrawForm = () => {
    return (
        <>
        {showMessage ? 
            (<>
            <h5>Transaction was successful.</h5>
            <Button variant="primary" type="submit" onClick={() => setShowMessage(false)}>Another withdrawal</Button>
        </> ) : (   
         <Formik
           initialValues={{amount: '' }}
           validate={values => {
             const errors = {};
             if (!values.amount) {
                errors.amount = 'Required';
             }
             if (parseInt(values.amount) < 0) {
                errors.amount = 'Needs to be more than 0';
             }
             return errors;
           }}
           onSubmit={(values, { setSubmitting }) => {
            handleWithdraw(values.amount);
            setSubmitting(false);
           }}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting,
             /* and other goodies */
           }) => (
             <form onSubmit={handleSubmit}>
               <input
                 type="number"
                 name="amount"
                 placeholder="Withdraw amount"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.amount}
               />
               {errors.amount && touched.amount && errors.amount}
               <br></br>
               <br></br>
                <Button variant="primary" type="submit">Withdraw</Button>
             </form>
           )}
         </Formik>
         )}
         </>
    )
  };

  const showAPIError = () => {
    return (
        <>
        <h5>{apiErrorMessage}</h5>
        <Button variant="primary" type="submit" onClick={() => setAPIErrorMessage('')}>Try again</Button>
        </>
    )
  };

return(
    <Card style={{height:'25rem', width:'25rem'}} bg={'warning'} text={'light'}>
    <Card.Header>{`Current Balance ${balanceAmount}`}</Card.Header>
    <Card.Body>
        <InputGroup className="mb-3">
        {!!apiErrorMessage ? showAPIError() : withdrawForm()}
        </InputGroup>
    </Card.Body>
</Card>
)
};

export default Withdraw