import mongoose from 'mongoose';

export interface ICommentDocument extends Document {
    content: string,
    userId: typeof mongoose.Types.ObjectId,
    date: Date
}

export const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId },
    date: { type: Date, default: Date.now() }
})

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema)
export default Comment