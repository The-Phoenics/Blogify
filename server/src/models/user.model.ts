import mongoose from 'mongoose'

export interface IUserDocument extends Document {
    username: string,
    email: string,
    password: string,
    joinDate: Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
});

const User = mongoose.model<IUserDocument>('User', userSchema)
export default User
