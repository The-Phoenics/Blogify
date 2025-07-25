import mongoose from "mongoose";
import Logger from "src/utils/logger";
import env from "src/env";

export async function connectDB(callback?: () => void) {
    try {
        await mongoose.connect(env.DATABASE_URL as string);
        Logger.info('MongoDB connected successfully');
        callback()
    } catch (error) {
        Logger.error(`Failed to connect to database: ${error}`);
        throw error;
    }
}