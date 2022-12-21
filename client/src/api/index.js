
import axios from 'axios';
const URL='http://localhost:5000/';
const CREATE_USER = 'users/createUser';
const DEPOSIT = 'service/deposit';
const WITHDRAW = 'service/withdraw';
const BALANCE = 'service/balance';
const TRANSFER = 'service/transfer';
const ALLDATA = 'alldata';

export const createUserInDb = (uid, email) => {
    axios.post(URL+CREATE_USER,{userId: uid, email: email})
}

export const deposit = (uid, amount = 0) => {
   return axios.post(URL+DEPOSIT,{userId: uid, amount: amount});
};

export const withdraw = (uid, amount) => {
    return axios.post(URL+WITHDRAW,{userId: uid, amount: amount})
};

export const getAllData = (uid) => {
    return axios.post(URL+ALLDATA,{userId: uid})
};
export const balance = (uid) => {return axios.post(URL+BALANCE,{userId: uid})};

export const transfer = (uid, email, amount) => {
    return axios.post(URL+TRANSFER,{userId: uid, receiver_email: email, amount: amount})
};