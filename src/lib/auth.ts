import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("bazar-dor-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazar-dor-better-auth-secret-key-32-chars-minimum",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!(
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: !!(
        process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ),
    },
  },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;