import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: { type: String, unique: true },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    joinDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema)
export default User
