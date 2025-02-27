import mongoose from 'mongoose';
import { ITagDocument } from '@models/tag.model';
import { commentSchema, ICommentDocument } from '@models/comment.model';

export interface IBlogDocument extends Document {
    title: string,
    authorId: typeof mongoose.Types.ObjectId,
    content: string,
    comments: [ICommentDocument],
    published: boolean,
    public: boolean,
    image: String,
    tags: [ITagDocument],
    date: Date,
    lastUpdated: Date,
}

const blogSchema = new mongoose.Schema<IBlogDocument>({
    title: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true },
    content: { type: String, required: true },
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

const Blog = mongoose.model<IBlogDocument>("Blog", blogSchema)
export default Blog;