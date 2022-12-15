
import axios from 'axios';
const URL='http://localhost:5000/';
const CREATE_USER = 'users/createUser';
const DEPOSIT = 'service/deposit';
const WITHDRAW = 'service/withdraw';
const ALLDATA = 'alldata';

export const fetchAllUsers = () => {
    axios.post(URL,{userID: '123', amount: 123})
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};

export const createUserInDb = (uid) => {
    axios.post(URL+CREATE_USER,{userId: uid})
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

export const deposit = (uid, amount) => {
    axios.post(URL+DEPOSIT,{userId: uid, amount: amount})
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};

export const withdraw = (uid, amount) => {
    axios.post(URL+WITHDRAW,{userId: uid, amount: amount})
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};

export const getAllData = (uid) => {
    axios.post(URL+ALLDATA,{userId: uid})
    .then(response => {
        console.log(response)
        return response.data.transactions;
    })
        // .then(resp => resp.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err));
};