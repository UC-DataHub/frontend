// // netlify/functions/nextauth.js

// const NextAuth = require("next-auth");
// const GitHubProvider = require("next-auth/providers/github");
// const GoogleProvider = require("next-auth/providers/google");
// const CredentialsProvider = require("next-auth/providers/credentials");
// const { admin } = require("../firebaseAdmin");

// const options = {
//     providers: [
//         GitHubProvider({
//             profile: async (profile, tokens) => {
//                 const { email } = profile;
//                 console.log("GitHub profile: ", profile);

//                 try {
//                     const userRecord = await admin.auth().getUserByEmail(email);
//                     console.log('User found:', userRecord);
//                 } catch (error) {
//                     await admin.auth().createUser({
//                         email,
//                         displayName: profile.name || profile.login,
//                         photoURL: profile.avatar_url || "",
//                     });
//                 }

//                 return profile;
//             },
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//         GoogleProvider({
//             profile: async (profile, tokens) => {
//                 const { email } = profile;
//                 console.log("Google profile: ", profile);

//                 try {
//                     const userRecord = await admin.auth().getUserByEmail(email);
//                     console.log('User found:', userRecord);
//                 } catch (error) {
//                     await admin.auth().createUser({
//                         email,
//                         displayName: profile.name,
//                         photoURL: profile.picture || "",
//                     });
//                 }

//                 return { id: profile.sub, email, name: profile.name };
//             },
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text", placeholder: "your email" },
//                 password: { label: "Password", type: "password", placeholder: "your password" },
//             },
//             async authorize(credentials) {
//                 const { email, password } = credentials;

//                 try {
//                     const userCredential = await admin.auth().getUserByEmail(email);
//                     console.log("User found:", userCredential);

//                     return { email, id: userCredential.uid, name: userCredential.displayName };
//                 } catch (error) {
//                     console.error("Error signing in:", error);
//                     throw new Error("Invalid credentials or user not found.");
//                 }
//             },
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.email = user.email;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.user.id = token.id;
//             session.user.email = token.email;
//             return session;
//         }
//     }
// };

// exports.handler = async (event, context) => {
//     return NextAuth(options)(event, context);
// };
