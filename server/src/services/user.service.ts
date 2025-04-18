import User, { IUserDocument } from "@models/user.model";
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export async function createUser(email: string, password: string): Promise<IUserDocument> | null {
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

async function get_user(username): Promise<IUserDocument | undefined> {
    if (!username) {
        return undefined
    }
    const user: IUserDocument = await User.findOne({
        username: username
    })
    if (!user) {
        return undefined
    }
    return user
}

export async function get_user_non_sesitive_by_username(username: string) {
    const user = await get_user(username)
    if (!user) {
        return undefined
    }
    return {
        username: user.username
    }
}

export async function get_user_details_by_username(username: string): Promise<IUserDocument | undefined> {
    const user = await get_user(username)
    return user
}