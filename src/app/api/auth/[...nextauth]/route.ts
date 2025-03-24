import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { toast } from "@/components/ui-hooks/use-toast";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  credentials: async (
    user: any,
    account: any,
    profile: any,
    email: any,
    credentials: any
  ) => {
    return true;
  },
  google: async (
    user: any,
    account: any,
    profile: any,
    email: any,
    credentials: any
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: process.env.NEXTAUTH_BACKEND_URL + "auth/google/",
        data: {
          access_token: account.id_token,
        },
      });
      account.meta = response.data;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/login/",
            method: "post",
            data: credentials,
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: any;
      account: any;
      profile: any;
      email: any;
      credentials: any;
    }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider as string)) return false;
      return await (
        SIGN_IN_HANDLERS as Record<
          string,
          (
            user: any,
            account: any,
            profile: any,
            email: any,
            credentials: any
          ) => Promise<boolean>
        >
      )[account.provider as string](user, account, profile, email, credentials);
    },
    async jwt({
      user,
      token,
      account,
    }: {
      user: any;
      token: any;
      account: any;
    }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        const backendResponse =
          account.provider === "credentials" ? user : account.meta;
        token.user = backendResponse.user;
        token.access_token = backendResponse.access;
        token.refresh_token = backendResponse.refresh;
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token.ref) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token.refresh_token,
          },
        });
        token.access_token = response.data.access;
        token.refresh_token = response.data.refresh;
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ token }: { token: any }) {
      return token;
    },
  },
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.NEXTAUTH_BACKEND_URL}auth/login/`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user = response.data;
          if (user) {
            // You can modify the user object here if needed
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          console.log("logging in...");
          console.error(error?.response?.data);
          console.error(
            "Error during authentication:",
            error?.code,
            error?.message
          );
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account?.provider ?? "")) return false;
      return await SIGN_IN_HANDLERS[
        account?.provider as keyof typeof SIGN_IN_HANDLERS
      ](user, account, profile, email, credentials);
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        const backendResponse: any =
          account.provider === "credentials" ? user : account.meta;
        token.user = backendResponse.user;
        token.access_token = backendResponse.access;
        token.refresh_token = backendResponse.refresh;
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > (token as { ref: number }).ref) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          data: {
            refresh: token.refresh_token,
          },
        });
        token.access_token = response.data.access;
        token.refresh_token = response.data.refresh;
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ token }: { token: any }) {
      return token;
    },
  },
});
export { handler as GET, handler as POST };
