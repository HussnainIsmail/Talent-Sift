// pages/api/send-reset-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, reset_link } = req.body;

        // Set up nodemailer transporter using Mailtrap's SMTP details
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '0ff3cffa572dd9', // Your Mailtrap username
                pass: 'daa005c8f047c6', // Your Mailtrap password
            },
        });

        // Create the email content
        const mailOptions = {
            from: 'hello@example.com', // Sender email (Mailtrap address or your own)
            to: email, // Recipient email
            subject: 'Password Reset Request',
            text: `Hello ${name},\n\nClick the link below to reset your password:\n\n${reset_link}\n\nIf you did not request this, please ignore this email.`,
            html: `<p>Hello ${name},</p><p>Click the link below to reset your password:</p><p><a href="${reset_link}">${reset_link}</a></p><p>If you did not request this, please ignore this email.</p>`,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Password reset email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email. Please try again.' });
        }
    } else {
        // Handle any non-POST requests
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
