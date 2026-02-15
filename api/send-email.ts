import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as nodemailer from 'nodemailer';

// If node-fetch is needed for older node versions, import it. Vercel Node 18 has global fetch.

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Restrict this in production
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message, recaptchaToken } = req.body;

    if (!name || !email || !message || !recaptchaToken) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Verify reCAPTCHA
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env['RECAPTCHA_SECRET_KEY']}&response=${recaptchaToken}`;
        const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
        const recaptchaData = await recaptchaRes.json() as any;

        if (!recaptchaData.success) {
            return res.status(400).json({ error: 'Invalid reCAPTCHA', details: recaptchaData });
        }

        // 2. Transporter (Brevo/Sendinblue)
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env['SMTP_USER'],
                pass: process.env['SMTP_PASSWORD']
            }
        });

        // 3. Send Email
        const info = await transporter.sendMail({
            from: `"${name}" <${process.env['FROM_EMAIL']}>`, // Must be a verified sender in Brevo
            replyTo: email,
            to: process.env['TO_EMAIL'],
            subject: `Portfolio Contact: ${subject || 'No Subject'}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        });

        console.log('Email sent successfully:', info.messageId);

        return res.status(200).json({ success: true });

    } catch (error: any) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
