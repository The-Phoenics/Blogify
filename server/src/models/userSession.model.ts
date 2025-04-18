import mongoose from 'mongoose';

export interface IUserSessionDocument extends Document {
    sid: string,
    userId: typeof mongoose.Types.ObjectId,
    createdAt: Date,
}

const userSessionSchema = new mongoose.Schema<IUserSessionDocument>({
    sid: { type: String, required: true },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

const UserSession = mongoose.model<IUserSessionDocument>("UserSession", userSessionSchema)
export default UserSession;