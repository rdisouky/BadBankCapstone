import {useState, useContext, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { Formik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../auth';
import {deposit, balance} from '../api/index';


const Deposit = () => {
    const [apiErrorMessage, setAPIErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const [balanceAmount, setBalance] = useState(0);
    const {currentUser} = useContext(AuthContext); 
    
    const getBalance = async () => {
        try{
        const response = await balance(currentUser.uid);
        if(response.status === 200) {
            setBalance(response.data.balance);
        }
    } catch(error) {
        console.log(error)
    }
    };
    useEffect(() => {
        getBalance();
    }, []);
    
    const handleDeposit = async (deposit_amount) => {
        try {
            const response = await deposit(currentUser.uid, deposit_amount);
            if(response && response.status === 200) {
                setShowMessage(true);
                setBalance(response.data.new_balance);
            }
            } catch(error) {
            setAPIErrorMessage(error.response.data.message)
            }
    }
    
    const depositForm = () => {
        return (
            <>
            {showMessage ? 
                (<>
                <h5>Transaction was successful.</h5>
                <Button variant="primary" type="submit" onClick={() => setShowMessage(false)}>Another deposit</Button>
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
                handleDeposit(values.amount);
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
                     placeholder="Deposit amount"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.amount}
                   />
                   {errors.amount && touched.amount && errors.amount}
                   <br></br>
                   <br></br>
                    <Button variant="primary" type="submit">Deposit</Button>
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
            {!!apiErrorMessage ? showAPIError() : depositForm()}
            </InputGroup>
        </Card.Body>
    </Card>
    )
    };

export default Deposit