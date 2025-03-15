import mongoose from 'mongoose';

export interface ICommentDocument extends Document {
    content: string,
    userId: mongoose.Types.ObjectId,
    date: Date
}

export const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now() }
})

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema)
export default Comment

const foo = {"content": "Great read.", "userId": "67c4cab7655d13a6324c7579", "blogId": "67c4cab7655d13a6324c7587"}