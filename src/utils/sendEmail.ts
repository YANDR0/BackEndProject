import { Request, Response } from 'express';
import nodeMailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const sendEmail = (to: string, req: Request, res: Response) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const html = fs.readFileSync(path.join(__dirname, '..', 'views', 'emails', 'sample.html'));

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Register successful',
        text: 'is it text email?',
        html
    };

    transporter.sendMail(mailOptions).then(response => {
        console.log('Response: ', response);
        res.send('Email sent');
    }).catch(error => {
        console.log('Error: ', error);
        res.send('Failed to send email');
    })
}