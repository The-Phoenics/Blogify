import User, { IUserDocument } from "@models/user.model";
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export async function createUser(email: string, password: string): Promise<IUserDocument> {
    // encrypt password
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPasswd = bcrypt.hashSync(password, salt);

    // create username from email
    const username = email.split('@')[0];
    let createdUser = new User({
        username: username,
        email: email,
        password: hashedPasswd
    })
    createdUser = await createdUser.save()
    return createdUser;
}