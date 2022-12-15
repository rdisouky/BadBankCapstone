import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../base';
import {createUserInDb} from '../api/index';

const CreateAccount = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        console.log(user);
        createUserInDb(user.uid);
            // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    };
    return (
        <Card style={{height:'25rem', width:'25rem'}} bg={'warning'} text={'light'}>
        <Card.Header>{'Create Account'}</Card.Header>
        <Card.Body>
            <InputGroup className="mb-3">
            <Form>
            <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={e => setEmail(e.currentTarget.value)}
            />
            <Form.Control
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={e => setPassword(e.currentTarget.value)}
            />
            </Form>
            </InputGroup>
            <Button variant="primary" onClick={handleCreateAccount}>Create Account</Button>
        </Card.Body>
    </Card>
    )
};

export default CreateAccount