// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});






// pages/api/auth/[...nextauth].js

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             authorization: {
//                 params: {
//                     scope: 'openid email profile',
//                     prompt: 'consent',
//                 },
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//             return true;
//         },
//         async redirect({ url, baseUrl }) {
//             return baseUrl;
//         },
//     },
// });



