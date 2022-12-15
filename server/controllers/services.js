import {getUser} from './util.js';
export const deposit = async (req, res) => {
    const { userId, amount } = req.body;
    const user = await getUser(userId);
    console.log(user);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    const new_balance = parseInt(user.balance) + parseInt(amount);
    console.log('new balance', new_balance);
    const transaction = {
        userId: userId,
        service: 'deposit',
        amount: parseInt(amount),
        new_balance: new_balance,
    };

    user.balance = new_balance;
    user.transactions.push(transaction);

    await user.save();
    res.status(200).json({message:'Amount deposited successfully'});
};

export const withdraw = async (req, res) => {
    const { userId, amount } = req.body;
    const user = await getUser(userId);
    console.log(user);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    const new_balance = parseInt(user.balance) - parseInt(amount);
    console.log('new balance', new_balance);
    if(new_balance < 0){
        res.status(400).json({message:'Can not withdraw more than balance'});
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
    res.status(200).json({message:'Amount withdrew successfully'});
};