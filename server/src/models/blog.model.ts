import mongoose from 'mongoose';
import { ITagDocument } from '@models/tag.model';
import { IUserDocument } from './user.model';

export interface IBlogDocument extends Document {
    title: string,
    author: IUserDocument,
    content: string,
    published: boolean,
    public: boolean,
    image: String,
    tags: [ITagDocument],
    date: Date,
    lastUpdated: Date,
}

const blogSchema = new mongoose.Schema<IBlogDocument>({
    title: { type: String, required: true },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String, required: true },
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