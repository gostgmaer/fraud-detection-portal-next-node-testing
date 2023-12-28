"use client";
import PasswordField from "@/components/global/fields/PasswordField";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/utils/validation/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginForm = () => {
  const { handleLoginAuth, user, userId, authError } = useAuthContext();
  const { data: session } = useSession();

 // console.log(session);
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
    
     // handleLoginAuth(values)

      const res = await signIn("credentials", {
        redirect: false,
        ...values,
      });
      if (res.ok) {
        if (res.url) {
          const parsedUrl = new URL(res.url);
          const callbackUrlParam = parsedUrl.searchParams.get("callbackUrl");
          const decodedCallbackUrl = callbackUrlParam
            ? decodeURIComponent(callbackUrlParam)
            : "/";

          route.push(decodedCallbackUrl);
        } else {
          route.push("/home");
        }
      }
    },
  });

  const handleLogin = async () => {};

  // useEffect(() => {
  //   if (userId) {
  //     route.push("/my-account/" + userId["user_id"]);
  //   }
  // }, [userId]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5 lg:space-y-6">
          <div className="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
            <label className="block">
              <span className="rizzui-input-label block text-base mb-2">
                Email
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white placeholder:text-sm border rounded-md focus:outline-none focus:border-blue-500 pr-0"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </label>
          </div>
          <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
            <label className="block">
              <span className="rizzui-password-label block text-base mb-2">
                Password
              </span>
              <PasswordField
                value={formik.values.password}
                handleChange={formik.handleChange}
                placeholder={"Password"}
                name={"password"}
              />
            </label>
          </div>
          <div className="flex items-center justify-between pb-1">
            <div className="rizzui-checkbox-root flex flex-col [&amp;>label>span]:font-medium">
              <label className="rizzui-checkbox-container flex flex-row items-center">
                <span className="relative leading-none">
                  <input
                    type="checkbox"
                    className="rizzui-checkbox-input peer disabled:bg-gray-50 disabled:border-gray-200 h-5 w-5 rounded bg-transparent border border-gray-300 checked:!bg-gray-1000 focus:ring-gray-900/30 checked:!border-gray-1000 hover:enabled:border-gray-1000"
                    name="isRememberMe"
                  />
                </span>
                <span className="rizzui-checkbox-label text-sm ml-1.5 rtl:mr-1.5">
                  Remember Me
                </span>
              </label>
            </div>
            <Link
              className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
              href="/auth/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            className="rizzui-button inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-8 py-2.5 text-base  rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full text-white"
            type="submit"
          >
            Sign In
          </button>
        </div>
        {authError && (
          <div className="error text-red-500 font-medium text-sm py-2">
            <p className="text-center">{authError.message}</p>
          </div>
        )}
      </form>
    </>
  );
};

export default LoginForm;



