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

function getVerificationToken(user: IUserDocument): string {
    let link: string = `http://localhost:${process.env.PORT}/verifyemail/`;
    const jwtSecret = process.env.JWT_SECRET_KEY
    if (!jwtSecret) {
        console.log("jwt secret key env variable not loaded")
    }
    const token = jwt.sign({
        data: user._id
    }, 'secret', { expiresIn: '300000ms' }); // 5 minutes
    return link
}

export async function sendVerificationLink(email: string, user: IUserDocument) {
    const link: string = getVerificationToken(user)
    const info = await transporter.sendMail({
        from: {
            name: 'Blogify',
            address: process.env.EMAIL_HOST
        },
        to: email,
        subject: "Email verification",
        text: `Click the link below to verify your account:`,
        html: `<h5>${link}<h5>`,
    });
}