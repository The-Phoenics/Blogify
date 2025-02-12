import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment