import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB(callback?: () => void) {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        console.log('SUCCESS: MongoDB connected successfully');
        callback()
    } catch (error) {
        console.log('ERROR: Failed to connect to database: ', error);
        throw error;
    }
}