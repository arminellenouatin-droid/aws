import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, twoFactor } from "better-auth/plugins";
import { db } from "@/server/db";
import { user, session, account, verification, twoFactor as twoFactorTable } from "@/server/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      twoFactor: twoFactorTable,
    },
  }),
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin({
      defaultRole: "client",
      adminRole: ["admin", "super_admin"],
    }),
    twoFactor({
      issuer: "Africa World Saving",
    }),
  ],
  trustedOrigins: [
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ],
  secret: process.env.BETTER_AUTH_SECRET || "aws_secret_key_antigravity_e8d5f3a2c4b71092837465abdf",
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
