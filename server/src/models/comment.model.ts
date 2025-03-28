import mongoose from 'mongoose';

export interface ICommentDocument extends Document {
    content: string,
    username: string,
    likes: number,
    date: Date,
    blogId: mongoose.Types.ObjectId
}

export const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Types.ObjectId, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() }
})

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema)
export default Comment;