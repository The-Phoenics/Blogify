import mongoose from "mongoose";

export interface ITagDocument extends Document {
    tag: String,
    blogsCount: number,
    followers: number
}

export const tagSchema = new mongoose.Schema<ITagDocument>({
    tag: {
        type: String,
        unique: true,
        required: true
    },
    blogsCount: {
        type: Number,
        min: 0
    },
    followers: {
        type: Number,
        min: 0
    }
})

const Tag = mongoose.model<ITagDocument>('Tag', tagSchema)
export default Tag