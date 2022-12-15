import mongoose from "mongoose";
// const transactionSchema = mongoose.Schema({
//     userId: { type: String, required: true },
//     service: { type: String, required: true },
//     amount: { type: Number, required: true },
//     new_balance: { type: Number, required: true },
// });

const userDataSchema = mongoose.Schema({
    userId: { type: String, required: true },
    balance: { type: Number, required: false, "default": 0 },
    transactions: { type:Array, required: false, "default": []},
});

// const CreateUser = mongoose.model('CreateUser', userSchema);
const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;