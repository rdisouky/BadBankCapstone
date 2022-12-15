import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userID: { type: String, required: true },
    amount: { type: Number, required: true },
});

const CreateUser = mongoose.model('CreateUser', userSchema);

export default CreateUser;