import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../base';
import {createUserInDb} from '../api/index';
import { Formik } from 'formik';

const CreateAccount = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [apiErrorMessage, setAPIErrorMessage] = useState('');


    const handleCreateAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        setShowMessage(true);
            // Signed in 
        const user = userCredential.user;
        createUserInDb(user.uid, user.email);
            // ...
        })
        .catch((error) => {
        console.log(error)
        setAPIErrorMessage(error.message)
        // ..
    });
    };

    const createAccountForm = () => {
      return (
          <>
           {showMessage ? 
    (<>
        <h5>You have successfully created an account!</h5>
        <button type="submit" className="btn btn-light" onClick={newAccount}>Add another account</button>
    </> ) : (   
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if (!values.password) {
            errors.password = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        handleCreateAccount(values.email, values.password);
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
             type="password"
             name="password"
             placeholder="Password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <br></br>
           <br></br>
            <Button variant="primary" type="submit">Create Account</Button>

         </form>
       )}
     </Formik>
     )}
          </>
      )};

    const newAccount = () => {
        setShowMessage(false);
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
       <Card.Header>{'Create Account'}</Card.Header>
        <Card.Body>
        <InputGroup className="mb-3">
        {!!apiErrorMessage ? showAPIError() :createAccountForm()}
     </InputGroup>
       </Card.Body>
     </Card>
    )
};

export default CreateAccount