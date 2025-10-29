import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "@auth/core/providers/email";
import { db } from "@prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      id: "email",
      type: "email",
      from: process.env.RESEND_SENDER || "no-reply@autobooker.ai",
      server: {
        host: process.env.EMAIL_SERVER_HOST || "smtp.example.com",
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER || "user",
          pass: process.env.EMAIL_SERVER_PASSWORD || "password",
        },
      },
      async sendVerificationRequest({ identifier, url }) {
        if (!process.env.RESEND_API_KEY) {
          // En développement, afficher le lien dans la console
          console.log(`Login link for ${identifier}: ${url}`);
          return;
        }
        // TODO: implémenter l'envoi via un provider d'e-mail comme Resend
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
