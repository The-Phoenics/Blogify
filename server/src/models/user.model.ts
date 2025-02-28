import mongoose from 'mongoose'

export interface IUserDocument extends Document {
    _id?: mongoose.Types.ObjectId,
    username: string,
    email: string,
    password: string,
    emailVerified: boolean,
    joinDate: Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    joinDate: { type: Date, default: Date.now },
});

const User = mongoose.model<IUserDocument>('User', userSchema)
export default User
