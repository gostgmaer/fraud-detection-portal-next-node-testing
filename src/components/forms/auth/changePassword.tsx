"use client";
import PasswordField from "@/components/global/fields/PasswordField";
import { useAuthContext } from "@/context/AuthContext";
import { post } from "@/lib/network/http";

import { useAxios } from "@/lib/network/interceptors";
import { notifySuccess } from "@/lib/notify/notification";

import { resetPasswordValidation } from "@/utils/validation/validation";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChangePassword = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const router = useRouter();

  const [error, setError] = useState(undefined);
  const param = useSearchParams();

  const handleSubmit = async (values) => {
    try {
      const reset = await post(
        `/user/auth/change-password`,
        { password: values.password }
      );
      if (reset.status == "OK") {
       notifySuccess(reset.message,2000)
      }
    } catch (error) {
      const myErr = error?.["message"];
      setError(JSON.parse(myErr));
    }
  };

  // useEffect(() => {
  //   if (userId) {
  //     router.push("/dashboard");
  //   }
  // }, [userId]);

  const formik = useFormik({
    initialValues: {
      current_password: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[50%]">
      <div className="space-y-5 text-black">
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Current Password
            </span>
            <PasswordField
              placeholder="current password"
              name="current_password"
              value={formik.values.current_password}
              handleChange={formik.handleChange}
            />
          </label>
        </div>
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Password
            </span>
            <PasswordField
              placeholder="Password"
              name="password"
              value={formik.values.password}
              handleChange={formik.handleChange}
            />
          </label>
        </div>
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block" htmlFor="confirm-password">
            <span className="rizzui-password-label block text-sm mb-1.5">
              Confirm Password
            </span>
            <PasswordField
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              handleChange={formik.handleChange}
            />
          </label>
        </div>

        <button
          className="rizzui-button  disabled:bg-gray-400 inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-8 py-2.5 text-base  rounded-md border border-transparent focus-visible:ring-offset-2 bg-gray-900 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0 w-full text-white"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Change Password</span> <KeyboardArrowRight />
        </button>
      </div>
      {error && (
        <div
          className={`error text-red-500 font-medium text-sm py-2 ${
            error["statusCode"] == 200 && " text-green-700"
          } `}
        >
          <p className="text-center">{error.message}</p>
        </div>
      )}
    </form>
  );
};

export default ChangePassword;
