import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmailSafe(to: string | null | undefined, subject: string, html: string): Promise<boolean> {
    // 1. Validate Recipient
    if (!to || to.trim() === "") {
        console.warn("[EMAIL WARN] Recipient email missing. Skipping email sending.");
        return false;
    }

    // 2. Check Logic (Simulation vs Real)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials not set. Email simulation:");
        console.log(`[SIMULATION] To: ${to}`);
        console.log(`[SIMULATION] Subject: ${subject}`);
        return true; // Pretend success
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || `"E-Shop Destek" <${process.env.SMTP_USER || 'noreply@e-shop.com'}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent successfully to ${to}`);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export async function sendVerificationEmail(to: string | null | undefined, code: string) {
    const html = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
            <div style="background:#000;padding:24px 28px;">
                <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">E-Shop</h1>
                <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Giriş Doğrulama Kodu</p>
            </div>
            <div style="padding:28px;">
                <p style="color:#1a1a1a;font-size:15px;">Merhaba,</p>
                <p style="color:#555;font-size:14px;line-height:1.6;">
                    Sisteme giriş yapabilmek için aşağıdaki doğrulama kodunu kullanabilirsiniz:
                </p>
                
                <div style="margin:24px 0;text-align:center;background:#f9f9f9;padding:20px;border-radius:12px;border:1px dashed #ddd;">
                    <h1 style="font-size:32px;letter-spacing:8px;color:#000;margin:0;font-family:monospace;">${code}</h1>
                </div>
                
                <p style="color:#888;font-size:12px;line-height:1.6;">
                    Bu kod 10 dakika boyunca geçerlidir. Eğer bu işlemi siz yapmadıysanız lütfen bu e-postayı dikkate almayınız.
                </p>
            </div>
            <div style="background:#f7f7f7;padding:16px 28px;border-top:1px solid #e5e5e5;">
                <p style="color:#bbb;font-size:10px;margin:0;font-style:italic;text-align:center;">© 2026 E-Shop - Tüm Hakları Saklıdır</p>
            </div>
        </div>
    `;

    return await sendEmailSafe(to, 'E-Shop - Giriş Doğrulama Kodu', html);
}

export async function sendEmailVerificationLink(to: string, verificationUrl: string) {
    const html = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
            <div style="background:#000;padding:24px 28px;">
                <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">E-Shop</h1>
                <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">E-posta Doğrulama</p>
            </div>
            <div style="padding:28px;">
                <p style="color:#1a1a1a;font-size:15px;">Merhaba,</p>
                <p style="color:#555;font-size:14px;line-height:1.6;">
                    E-Shop'a hoş geldiniz! Hesabınızı aktifleştirmek ve e-posta adresinizi doğrulamak için aşağıdaki butona tıklayabilirsiniz.
                </p>
                
                <div style="margin:24px 0;text-align:center;">
                    <a href="${verificationUrl}" 
                       style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 12px rgba(59,130,246,0.2);">
                        ✅ E-postamı Doğrula
                    </a>
                </div>
                
                <p style="color:#888;font-size:12px;line-height:1.6;">
                    Bu bağlantı 24 saat boyunca geçerlidir.
                </p>
                
                <p style="color:#aaa;font-size:11px;margin-top:24px;border-top:1px solid #eee;padding-top:16px;">
                    Buton çalışmıyorsa aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz:<br>
                    <a href="${verificationUrl}" style="color:#3b82f6;word-break:break-all;">${verificationUrl}</a>
                </p>
            </div>
            <div style="background:#f7f7f7;padding:16px 28px;border-top:1px solid #e5e5e5;">
                <p style="color:#bbb;font-size:10px;margin:0;font-style:italic;text-align:center;">© 2026 E-Shop - Tüm Hakları Saklıdır</p>
            </div>
        </div>
    `;

    return await sendEmailSafe(to, 'E-Shop - E-posta Adresinizi Doğrulayın', html);
}

export async function sendEmailChangeVerification(to: string, verificationUrl: string) {
    const html = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
            <div style="background:#000;padding:24px 28px;">
                <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">E-Shop</h1>
                <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">E-posta Değişikliği Onayı</p>
            </div>
            <div style="padding:28px;">
                <p style="color:#1a1a1a;font-size:15px;">Merhaba,</p>
                <p style="color:#555;font-size:14px;line-height:1.6;">
                    Hesabınıza bağlı e-posta adresini değiştirmek istediğinizi belirttiniz. Bu değişikliği onaylamak için lütfen aşağıdaki butona tıklayın.
                </p>
                
                <div style="margin:24px 0;text-align:center;">
                    <a href="${verificationUrl}" 
                       style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 12px rgba(59,130,246,0.2);">
                        🔄 Değişikliği Onayla
                    </a>
                </div>
                
                <p style="color:#888;font-size:12px;line-height:1.6;">
                    Bu işlemi siz yapmadıysanız lütfen hemen şifrenizi değiştirin ve yönetici ile iletişime geçin. Bu bağlantı 1 saat boyunca geçerlidir.
                </p>
                
                <p style="color:#aaa;font-size:11px;margin-top:24px;border-top:1px solid #eee;padding-top:16px;">
                    Buton çalışmıyorsa aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz:<br>
                    <a href="${verificationUrl}" style="color:#3b82f6;word-break:break-all;">${verificationUrl}</a>
                </p>
            </div>
            <div style="background:#f7f7f7;padding:16px 28px;border-top:1px solid #e5e5e5;">
                <p style="color:#bbb;font-size:10px;margin:0;font-style:italic;text-align:center;">© 2026 E-Shop - Tüm Hakları Saklıdır</p>
            </div>
        </div>
    `;

    return await sendEmailSafe(to, 'E-Shop - E-posta Değişikliği Onayı', html);
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
    const html = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
            <div style="background:#000;padding:24px 28px;">
                <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;">E-Shop</h1>
                <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Şifre Sıfırlama İsteği</p>
            </div>
            <div style="padding:28px;">
                <p style="color:#1a1a1a;font-size:15px;">Merhaba,</p>
                <p style="color:#555;font-size:14px;line-height:1.6;">
                    Hesabınız için bir şifre sıfırlama isteği aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayabilirsiniz.
                </p>
                
                <div style="margin:24px 0;text-align:center;">
                    <a href="${resetUrl}" 
                       style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 12px rgba(0,0,0,0.2);">
                        🔒 Şifremi Sıfırla
                    </a>
                </div>
                
                <p style="color:#888;font-size:12px;line-height:1.6;">
                    Bu bağlantı 1 saat boyunca geçerlidir. Eğer şifre sıfırlama isteğinde bulunmadıysanız bu e-postayı dikkate almayınız.
                </p>
                
                <p style="color:#aaa;font-size:11px;margin-top:24px;border-top:1px solid #eee;padding-top:16px;">
                    Buton çalışmıyorsa aşağıdaki bağlantıyı tarayıcınıza kopyalayabilirsiniz:<br>
                    <a href="${resetUrl}" style="color:#000;word-break:break-all;">${resetUrl}</a>
                </p>
            </div>
            <div style="background:#f7f7f7;padding:16px 28px;border-top:1px solid #e5e5e5;">
                <p style="color:#aaa;font-size:11px;margin:0;margin-bottom:5px;">Bu e-posta E-Shop tarafından otomatik olarak gönderilmiştir.</p>
                <p style="color:#bbb;font-size:10px;margin:0;font-style:italic;">© 2026 E-Shop - Tüm Hakları Saklıdır</p>
            </div>
        </div>
    `;

    return await sendEmailSafe(to, 'E-Shop - Şifre Sıfırlama', html);
}

