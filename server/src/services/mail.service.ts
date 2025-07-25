import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import jwt from "jsonwebtoken";
import { IUserDocument } from "@models/user.model";

const transporter: Mail = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD
    },
});

function getVerificationTokenLink(user: IUserDocument): string {
    let link: string = `http://localhost:${process.env.PORT}/auth/verifyemail/`;
    const jwtSecret = process.env.JWT_SECRET_KEY
    if (!jwtSecret) {
        console.log("jwt secret key env variable not loaded")
    }
    const token: string = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: '300000ms' }); // 5 minutes
    return link + token;
}

export async function sendVerificationLink(email: string, user: IUserDocument) {
    const link: string = getVerificationTokenLink(user)
    const info = await transporter.sendMail({
        from: {
            name: 'Blogify',
            address: process.env.EMAIL_HOST
        },
        to: email,
        subject: "Email verification",
        text: `Click the link below to verify your account:`,
        html: `Click this link to verify your account: <a href=${link}>${link}<h5>`,
    });
}