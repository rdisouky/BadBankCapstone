import {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import { auth, provider } from '../base';
import {createUserInDb} from '../api/index';
import { Formik } from 'formik';


const Login = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [apiErrorMessage, setAPIErrorMessage] = useState('');

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setShowMessage(true);
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    setAPIErrorMessage(error.message)
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setShowMessage(true);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                createUserInDb(user.uid,user.email);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loginForm = () => {
      return (
        <>
        {showMessage ? 
        (<>
            <h5>You have successfully logged in.</h5>
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
            handleLogin(values.email, values.password);
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
                <Button variant="primary" type="submit">Login</Button>
    
             </form>
           )}
         </Formik>
         )}
          </>)
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
        <Card.Header>{'Login with'}</Card.Header>
        <Card.Body>
            <InputGroup className="mb-3">
            {!!apiErrorMessage ? showAPIError() : loginForm()}
            </InputGroup>
            {showMessage ? null : (
                <>
            <Card.Text>Or</Card.Text>
            <GoogleButton
              onClick={handleGoogleSignIn}
            />
            </>
            )}
        </Card.Body>
    </Card>
    )
};

export default Login