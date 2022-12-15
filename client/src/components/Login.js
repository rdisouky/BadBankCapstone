import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../base';
import {fetchAllUsers,createUserInDb} from '../api/index';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleLogin = () => {};

    const handleGoogleSignIn = () => {
        console.log("Google Sign In");
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                createUserInDb(user.uid);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
      <Card style={{height:'25rem', width:'25rem'}} bg={'warning'} text={'light'}>
        {/* <Card.Header>{'Login with'}</Card.Header> */}
        <Card.Body>
            <InputGroup className="mb-3">
            <Form>
            <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={e => setUsername(e.currentTarget.value)}
            />
            <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={e => setEmail(e.currentTarget.value)}
            />
            </Form>
            </InputGroup>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
            <Card.Text>Or</Card.Text>
            <GoogleButton
              onClick={handleGoogleSignIn}
            />
        </Card.Body>
    </Card>
    //     <button
    //     className="btn btn-secondary ms-3"
    //     type="button"
    //     onClick={handleGoogleSignIn}
    //   >
    //     Authenticate with Google
    //   </button>
    )
};

export default Login