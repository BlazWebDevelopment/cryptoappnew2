import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/app/lib/mongodb";
import User from "@/models/user/User";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      const users = await User.find({ email: user.email });

      const transactions: any[] = [];
      const yourCoins: any[] = [];

      if (users.length === 0) {
        const newUser = new User({
          email: user.email,
          name: user.name,
          balance: 100000,
          transactions,
          yourCoins,
        });

        await newUser.save();
      }

      return true;
    },
  },
});

export { authHandler as GET, authHandler as POST };
