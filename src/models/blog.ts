import mongoose from 'mongoose';
import { commentSchema } from './comment';
import { tagSchema } from './tag';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [commentSchema],
    published: { type: Boolean, default: false },
    image: String,
    tags: [tagSchema],
    date: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blogs", blogSchema)
export default Blog;