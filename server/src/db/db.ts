import mongoose from "mongoose";
import dotenv from "dotenv";
import Logger from "src/utils/logger";
dotenv.config();

export async function connectDB(callback?: () => void) {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);
        Logger.info('MongoDB connected successfully');
        callback()
    } catch (error) {
        Logger.error(`Failed to connect to database: ${error}`);
        throw error;
    }
}