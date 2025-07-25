import dotenv from "dotenv";
dotenv.config();

import z, { ZodError } from "zod";
import { Log } from "./utils/util";
import Logger from "./utils/logger";

const envServerSchema = z.object({
    PORT: z.number("PORT number missing").readonly(),
    DATABASE_URL: z.string("DATABASE_URL is missing").readonly(),
    JWT_SECRET_KEY: z.string("JWT_SECRET_KEY missing").readonly(),
    EMAIL_HOST: z.string("EMAIL_HOST missing").readonly(),
    EMAIL_PASS: z.string("EMAIL_PASS missing").readonly(),
})

const env = {
    PORT: parseInt(process.env.PORT.trim()),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASS: process.env.EMAIL_PASS,
}

console.log(env)

const result = envServerSchema.safeParse(env)
if (!result.success) {
    console.log("err ----------", result.error.issues.forEach((errObject) => {
        Logger.error(errObject.message)
    }))
    throw Error("❗Environment variables missing");
}

export default env