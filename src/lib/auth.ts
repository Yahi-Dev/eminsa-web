import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const isLocalSmtp = !process.env.MAIL_USERNAME || process.env.MAIL_USERNAME === "none";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: Number(process.env.MAIL_PORT) || 25,
  secure: process.env.MAIL_ENCRYPTION === "ssl",
  ...(isLocalSmtp ? {} : {
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  }),
  tls: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      console.log("[MAIL] sendResetPassword called for:", user.email);
      console.log("[MAIL] SMTP config:", { host: process.env.MAIL_HOST, port: process.env.MAIL_PORT, user: process.env.MAIL_USERNAME, from: process.env.MAIL_FROM_ADDRESS });
      try {
      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: user.email,
        subject: "Restablecer contraseña - Grupo EMINSA",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #00269b, #00175d); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Grupo EMINSA</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #111827; margin-top: 0;">Restablecer contraseña</h2>
              <p style="color: #6b7280;">Hola <strong>${user.name}</strong>,</p>
              <p style="color: #6b7280;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón a continuación para continuar:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="display: inline-block; padding: 14px 32px; background: #00269b; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Restablecer contraseña
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña no cambiará.</p>
              <p style="color: #9ca3af; font-size: 14px;">Este enlace expirará en <strong>1 hora</strong>.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                © ${new Date().getFullYear()} Grupo EMINSA. Todos los derechos reservados.
              </p>
            </div>
          </div>
        `,
      });
      console.log("[MAIL] Email sent successfully to:", user.email);
      } catch (error) {
        console.error("[MAIL] Failed to send email:", error);
        throw error;
      }
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 min
    },
    cookie: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
