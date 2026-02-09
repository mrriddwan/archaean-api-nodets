import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { prisma } from "./prisma";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID environment variable is not set");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET environment variable is not set");
}
if (!process.env.BASE_URL) {
  throw new Error("BASE_URL environment variable is not set");
}

const callbackURL = `${process.env.BASE_URL}/api/v1/auth/google/callback`;

console.log(`[Passport] Google OAuth Configuration:`);
console.log(`  Client ID: ${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...`);
console.log(`  Callback URL: ${callbackURL}`);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        console.log("[OAuth] Profile received from Google:", {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });

        const googleId = profile.id;

        const googleAuth = await prisma.oAuthAccount.findFirst({
          where: {
            provider: "google",
            userProviderId: googleId,
          },
          include: {
            user: true,
          },
        });

        if (googleAuth && googleAuth.user) {
          console.log("[OAuth] Existing user found:", googleAuth.user.email);
          return done(null, googleAuth.user);
        }

        const email = profile.emails?.[0]?.value;
        let user = email
          ? await prisma.user.findUnique({ where: { email } })
          : null;

        if (user) {
          console.log(
            "[OAuth] Linking Google account to existing user:",
            user.email
          );
          await prisma.oAuthAccount.create({
            data: {
              provider: "google",
              userProviderId: googleId,
              userId: user.id,
            },
          });
          return done(null, user);
        }

        console.log("[OAuth] Creating new user with Google account");
        user = await prisma.user.create({
          data: {
            email: email || `google_${googleId}@example.com`,
            name:
              profile.displayName ||
              profile.name?.givenName ||
              "Google User",
            oAuthAccounts: {
              create: {
                provider: "google",
                userProviderId: googleId,
              },
            },
          },
        });

        console.log("[OAuth] New user created:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("[OAuth] Error in verify function:", error);
        return done(error as Error);
      }
    }
  )
);
