import {getUser} from './util.js';

export const getAllData = async (req, res) => {
    const { userId } = req.body;
    console.log("userid ",userId);
    const user = await getUser(userId);
    console.log(user);
    if(!user){
        res.status(400).json({message:'User does not exist'});
        return;
    }
    const transactions = user.transactions;
    res.status(200).json({transactions:transactions});
};