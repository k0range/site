import { betterAuth } from "better-auth";

export const auth = betterAuth({
  user: {
    additionalFields: {
      github_name: {
        type: "string",
        required: false
      }
    }
  },
  socialProviders: {
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser(profile) {
        return {
          github_name: profile.login
        }
      },
    },
  },
  advanced: {
    skipTrailingSlashes: true
  }
});

type Session = typeof auth.$Infer.Session
