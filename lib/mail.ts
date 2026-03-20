import nodemailer from "nodemailer";

/**
 * SMTP Mail Utility (Passive Setup)
 * This utility provides a foundation for sending and receiving emails.
 * Instructions: Configure environment variables (SMTP_HOST, SMTP_PORT, etc.) to activate.
 */

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
    },
});

export async function sendMail({ to, subject, html, text }: { to: string; subject: string; html?: string; text?: string }) {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME || "e-Commerce"}" <${process.env.SMTP_FROM_EMAIL || "no-reply@example.com"}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}

// Example usage: 
// await sendMail({ to: "user@example.com", subject: "Sipariş Onayı", html: "<h1>Siparişiniz Alındı!</h1>" });
