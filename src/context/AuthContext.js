"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { setToken } from "@/helper/function";
import Cookies from "js-cookie";
import { get, post } from "@/lib/network/http";
import moment from "moment";
import { useSession } from "next-auth/react";
import { storeCookiesOfObject } from "@/lib/helper";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {

  const { data: session, status } = useSession();

  useEffect(() => {
    // When the session changes (e.g., after successful login), set cookies
    console.log(session);
    if (session) {
      // Cookies.set('access_token', session["user"]["accessToken"]);
      // Cookies.set('refresh_token', session["user"]["refreshToken"]);

      if (session.user["accessToken"]) {
        const token = session.user["accessToken"].split(".");
        setToken("headerPayload", `${token[0]}.${token[1]}`, session.user["exp"]);
        setToken("signature", `${token[2]}`, session.user["exp"]);
      }
      storeCookiesOfObject(session["user"])
    }
  }, [session]);


  const [user, setUser] = React.useState(undefined);
  const [authError, setAuthError] = useState(undefined);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(undefined);

  const router = useRouter();

  const handleLoginAuth = async (body) => {
    // const res = await post("/user/auth/login", body);
    // console.log(res);
    try {
      const res = await post("/user/auth/login", body);
      if (res.statusCode != 200) {
        setAuthError(res);
      } else {
        const decoded = jwtDecode(res.access_token);
        const decodedrefersh = jwtDecode(res.refresh_token);
        setToken(
          "accessToken",
          res.access_token,
          decoded["exp"],
          "ACCESS_TOKEN"
        );
        setToken("refreshToken", res.refresh_token, decodedrefersh["exp"]);
        setUserId(decoded);
        setUser(jwtDecode(res.id_token));
        setAuthError(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signout = async () => {
    try {
      const res = await post("/user/auth/logout");
      if (res.statusCode == "200") {
        router.push("/auth/signin");
        window.sessionStorage.clear();
        window.localStorage.clear();
        const cookies = Cookies.get();
        for (const cookie in cookies) {
          Cookies.remove(cookie);
        }
        setUser(undefined);
        setUserId(undefined);

        setAuthError(undefined);
      } else {
        setAuthError(res);
      }
    } catch (error) { }
  };

  const unsubscribe = async () => {
    const cookiesData = Cookies.get();
    try {
      if (cookiesData["headerPayload"]) {
        const decodedToken = jwtDecode(
          cookiesData["headerPayload"] + "." + cookiesData["signature"]
        );

        if (decodedToken["user_id"]) {
          const response = await post("/user/auth/verify/session");

          if (response) {

            const decoded = jwtDecode(response["accessToken"]);
            const id = jwtDecode(response["id_token"]);

            setToken(
              "accessToken",
              response.accessToken,
              decoded["exp"],
              "ACCESS_TOKEN"
            );
            setUserId(decoded);
            setUser(id);
            setAuthError(undefined);
          }
        }
      }
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
      setAuthError(error.message);
    }
  };

  const getToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const res = await post("/user/auth/session/refresh/token", {
          token: refreshToken,
        });
        const decoded = jwtDecode(res.access_token);
        setToken(
          "accessToken",
          res.access_token,
          decoded["exp"],
          "ACCESS_TOKEN"
        );
        setUserId(decoded);
      }
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
    }
  };



  const getUserData = async () => {
    const request = await get(`/user/auth/profile`);
    setProfile({ ...request.result, dateOfBirth: moment(request.result?.dateOfBirth).format('YYYY-MM-DD') });
  };



  // React.useEffect(() => {
  //   unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const tokenRefreshInterval = setInterval(getToken, 10 * 60 * 1000);

  //   return () => clearInterval(tokenRefreshInterval);
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, signout, userId, authError, getUserData, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
