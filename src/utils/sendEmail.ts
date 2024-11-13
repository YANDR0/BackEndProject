import nodeMailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const sendEmail = (to: string) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const file = fs.readFileSync(path.join(__dirname, '..', 'views', 'emails', 'sample.html'));
    const html = file.toString().replace('{user}', to);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Register successful',
        text: 'is it text email?',
        html
    };

    transporter.sendMail(mailOptions).then(response => {
        console.log('Response: ', response);
    }).catch(error => {
        console.log('Error: ', error);
    })
}