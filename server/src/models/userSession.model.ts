import mongoose from 'mongoose';

export interface IUserSessionDocument extends Document {
    token: string,
    user: typeof mongoose.Types.ObjectId,
    createdAt: Date,
}

const userSessionSchema = new mongoose.Schema<IUserSessionDocument>({
    token: { type: String, required: true },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

const UserSession = mongoose.model<IUserSessionDocument>("UserSession", userSessionSchema)
export default UserSession;