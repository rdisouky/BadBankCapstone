import UserData from '../models/userData.js';

const doesUserExist = async (uid) => {
    const users = await UserData.find({userId: uid});
    return users.length > 0;
};

export const createUser = async (req, res) => {
    const user = req.body;
    const doesIt = await doesUserExist(user.userID);
    if(doesIt){
        res.status(400).json({message:'User exists'});
        return;
    }
    const newUser = new UserData(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
};

