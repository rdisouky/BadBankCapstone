import {getUser, getUserByEmail} from './util.js';
export const deposit = async (req, res) => {
    const { userId, amount } = req.body;
    const user = await getUser(userId);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    const new_balance = parseInt(user.balance) + parseInt(amount);
    const transaction = {
        userId: userId,
        service: 'deposit',
        amount: parseInt(amount),
        new_balance: new_balance,
    };

    user.balance = new_balance;
    user.transactions.push(transaction);

    await user.save();
    res.status(200).json({message:'Amount deposited successfully', new_balance: new_balance});
};

export const withdraw = async (req, res) => {
    const { userId, amount } = req.body;
    const user = await getUser(userId);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    const new_balance = parseInt(user.balance) - parseInt(amount);
    if(new_balance < 0){
        res.status(400).json({message:'Cannot withdraw more than balance'});
        return;
    }
    const transaction = {
        userId: userId,
        service: 'withdraw',
        amount: parseInt(amount),
        new_balance: new_balance,
    };

    user.balance = new_balance;
    user.transactions.push(transaction);

    await user.save();
    res.status(200).json({message:'Amount withdrew successfully', new_balance: new_balance});
};

export const getBalance = async (req, res) => {
    const { userId } = req.body;
    const user = await getUser(userId);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    res.status(200).json({balance:user.balance});
};

export const transfer = async (req, res) => {
    const { userId, amount, receiver_email } = req.body;
    const sender_user = await getUser(userId);
    const receiver_user = await getUserByEmail(receiver_email);
    console.log('users',sender_user, receiver_user);
    if(!(sender_user && receiver_user)){
        res.status(400).json({message:'User does not exist'});
        return;
    }

    const sender_new_balance = parseInt(sender_user.balance) - parseInt(amount);
    if(sender_new_balance < 0){
        res.status(400).json({message:'Cannot transfer more than balance'});
        return;
    }
    const receiver_new_balance = parseInt(receiver_user.balance) + parseInt(amount);
    console.log('new balance sender and reciver', sender_new_balance, receiver_new_balance);
    const sender_transaction = {
        userId: sender_user.userId,
        service: 'transfer to '+receiver_user.email,
        amount: parseInt(amount),
        new_balance: sender_new_balance,
    };

    const receiver_transaction = {
        userId: receiver_user.userId,
        service: 'transfer from '+ sender_user.email,
        amount: parseInt(amount),
        new_balance: receiver_new_balance,
    };

    sender_user.balance = sender_new_balance;
    sender_user.transactions.push(sender_transaction);
    
    receiver_user.balance = receiver_new_balance;
    receiver_user.transactions.push(receiver_transaction);

    await sender_user.save();
    await receiver_user.save();
    res.status(200).json({message:'Amount transfered successfully', new_balance: sender_new_balance});
};