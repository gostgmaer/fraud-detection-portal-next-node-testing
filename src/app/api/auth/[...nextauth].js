// import { baseurl, secret } from "@/config/setting";
// import { setToken } from "@/helper/function";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from 'js-cookie';
// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, headers) {
//         try {
//           const response = await fetch(baseurl + "/user/auth/login", {
//             method: "POST",
//             body: JSON.stringify(credentials),
//             headers: { "Content-Type": "application/json" },
//           });

//           // console.log(apiCookies);
//           const user = await response.json();

//           if (user.access_token) {
//             const access_token = jwtDecode(user.access_token);
//             const userInfo = jwtDecode(user.id_token);
//             // console.log(access_token,userInfo);
//             const userSession = {
//               ...user,
//               ...userInfo,
//               ...access_token,
//               image: userInfo["profilePicture"],
//               name: `${userInfo["firstName"]} ${userInfo["lastName"]}`,sub:access_token["user_id"]
//             };

//           return userSession
//           } else {
//             console.error("Authentication failed:", response.statusText);
//             return Promise.resolve(null);
//           }
//         } catch (error) {
//           console.error("Error during authentication:", error);
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],

//   debug: true,
//   secret: secret,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     // jwt: async (token, user) => {
//     //   // Customize the JWT payload
//     //   token.customClaim = "some value";
//     //   return Promise.resolve(token);
//     // },
//     session: async (session,token,user) => {
//       // Include user information in the session
//       const response = await fetch(baseurl + `/user/auth/profile${session.session.user.email}`, {
//         method: "get",
//         headers: { "Content-Type": "application/json" },
//       });
//       const profile = await response.json();
//       return Promise.resolve(session);
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Your sign-in page URL
//     error: "/auth/signin", // Your error page URL
//   },
// });

import NextAuth from 'next-auth'
import { baseurl, secret } from "@/config/setting";
import { jwtDecode } from "jwt-decode";
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        }

        const res = await fetch(baseurl + `/user/auth/login`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const user = await res.json()
        if (!res.ok) {
          throw new Error(user.message)
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
    // ...add more providers here
  ],
  secret: secret,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const access_token = jwtDecode(user["access_token"]);
        const userInfo = jwtDecode(user["id_token"]);
       
        Cookies.set('access_token', user["access_token"]);
        Cookies.set('refresh_token', user["refresh_token"]);
        return {
          ...token,
          accessToken: user["access_token"],
          refreshToken: user["refresh_token"],
          idToken: user["id_token"], id: access_token["user_id"], email: userInfo["email"], image: userInfo["profilePicture"], name: `${userInfo["firstName"]} ${userInfo["lastName"]}`
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})