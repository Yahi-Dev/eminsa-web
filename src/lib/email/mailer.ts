import nodemailer from "nodemailer";

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export async function sendEmail({ to, subject, text, html, cc, bcc }: EmailOptions) {
  try {
    const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_FROM_ADDRESS"];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    const port = parseInt(process.env.MAIL_PORT as string, 10);
    const isSsl = port === 465; 
    const transportConfig: any = {
      host: process.env.MAIL_HOST,
      port,
      secure: isSsl,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    };

    // Handle Herd Pro authentication - try multiple approaches
    if (process.env.MAIL_HOST === "127.0.0.1" || process.env.MAIL_HOST === "localhost") {
      // For Herd Pro local SMTP, try without authentication first
    } else if (process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD !== "null") {
      // For remote SMTP servers with real credentials
      transportConfig.auth = {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      };
    }

    const transporter = nodemailer.createTransport(transportConfig);

    // Prepare email data
    const fromAddress = process.env.MAIL_FROM_NAME
      ? `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`
      : process.env.MAIL_FROM_ADDRESS;

    const mailOptions = {
      from: fromAddress,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      ...(text && { text }),
      ...(html && { html }),
      ...(cc && { cc: Array.isArray(cc) ? cc.join(', ') : cc }),
      ...(bcc && { bcc: Array.isArray(bcc) ? bcc.join(', ') : bcc }),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      info,
    };
  } catch (error) {
    console.error("❌ Failed to send email:", {
      error: error instanceof Error ? error.message : "Unknown error",
      to,
      subject,
    });

    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Verifica la conexión del servidor SMTP
 */
export async function verifySMTPConnection(): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_PORT === '465',
      auth: process.env.MAIL_USERNAME ? {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      } : undefined,
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    });

    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}