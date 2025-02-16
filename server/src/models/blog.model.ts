import mongoose from 'mongoose';
import { commentSchema } from './comment.model';


const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true },
    body: { type: String, required: true },
    comments: [commentSchema],
    published: { type: Boolean, default: false },
    public: { type: Boolean, default: true },
    image: String,
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    date: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema)
export default Blog;