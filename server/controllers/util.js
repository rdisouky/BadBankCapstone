import UserData from '../models/userData.js';

export const getUser = async (userId) => {
    const user =  await UserData.find({userId: userId});
    if(!user) return null;
    return user[0];
}

export const getUserByEmail = async (email) => {
    const user =  await UserData.find({email: email});
    if(!user) return null;
    return user[0];
}