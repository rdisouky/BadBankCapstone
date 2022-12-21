import {useState, useContext, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {transfer, balance} from '../api/index';
import { Formik } from 'formik';
import { AuthContext } from '../auth';


const Transfer = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [apiErrorMessage, setAPIErrorMessage] = useState('');
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


  const handleTransfer = async (email, password) => {
    try{
    const response = await transfer(currentUser.uid, email, password);
    if(response && response.status === 200) {
        setShowMessage(true);
        setBalance(response.data.new_balance);
        return;
    }}
    catch(error) {
        setAPIErrorMessage(error.response.data.message)
    }
  };

  const transferForm = () => {
    return (
        <>
        {showMessage ? 
            (<>
            <h5>Transaction was successful.</h5>
        </> ) : (   
         <Formik
           initialValues={{ email: '', amount: '' }}
           validate={values => {
             const errors = {};
             if (!values.email) {
               errors.email = 'Required';
             } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
             ) {
               errors.email = 'Invalid email address';
             }
             if (!values.amount) {
                errors.amount = 'Required';
             }
             return errors;
           }}
           onSubmit={(values, { setSubmitting }) => {
            handleTransfer(values.email, values.amount);
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
                 type="email"
                 name="email"
                 placeholder="Email"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.email}
    
               />
               {errors.email && touched.email && errors.email}
               <br></br>
               <br></br>
               <input
                 type="number"
                 name="amount"
                 placeholder="Amount"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.amount}
               />
               {errors.amount && touched.amount && errors.amount}
               <br></br>
               <br></br>
                <Button variant="primary" type="submit">Send</Button>
    
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

    return (
      <Card style={{height:'25rem', width:'25rem'}} bg={'warning'} text={'light'}>
        <Card.Header>{`Current Balance ${balanceAmount}`}</Card.Header>
        <Card.Body>
            <InputGroup className="mb-3">
            {!!apiErrorMessage ? showAPIError() : transferForm()}
            </InputGroup>
        </Card.Body>
    </Card>
    )
};

export default Transfer