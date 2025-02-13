import mongoose from "mongoose";

export const tagSchema = new mongoose.Schema({
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

const Tag = mongoose.model('Tags', tagSchema)
export default Tag