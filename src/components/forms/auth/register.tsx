"use client";
import PasswordField from "@/components/global/fields/PasswordField";
import { post } from "@/lib/network/http";

import { registerValidationSchema } from "@/utils/validation/validation";
import { ArrowForward } from "@mui/icons-material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const RegisterForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();



  const handleSubmit = async (values) => {

    //console.log(values);
    try {
      const res = await post("/user/auth/register", values);
      if (res) {
        router.push("/auth/login");
      }
    } catch (error) {
      setError(error);
     // console.log(error);
    }
  };


  
  const handleRegistration = async (body) => {

 
  };


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAgreed: "false",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5 text-black">
        <div className="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-input-label block text-sm mb-1.5">
              First Name
            </span>
            <span className="rizzui-input-container bg-white flex items-center peer w-full transition duration-200 px-4 py-2 h-12 rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-blue [&amp;.is-focus]:border-blue [&amp;.is-focus]:ring-blue text-sm">
              <input
                placeholder="Enter your first name"
                className="rizzui-input-field w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                type="text"
                name="firstName"
                required
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </span>
          </label>
          {formik.errors.firstName && formik.touched.firstName && (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-input-label block text-sm mb-1.5">
              Last Name
            </span>
            <span className="rizzui-input-container bg-white flex items-center peer w-full transition duration-200 px-4 py-2 h-12 rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-blue [&amp;.is-focus]:border-blue [&amp;.is-focus]:ring-blue text-sm">
              <input
                spellCheck="false"
                placeholder="Enter your last name"
                className="rizzui-input-field w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </span>
          </label>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
        <div className="rizzui-input-root flex flex-col col-span-2 [&amp;>label>span]:font-medium">
          <label className="block">
            <span className="rizzui-input-label block text-sm mb-1.5">
              Email
            </span>
            <span className="rizzui-input-container bg-white flex items-center peer w-full transition duration-200 px-4 py-2 h-12 rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-blue [&amp;.is-focus]:border-blue [&amp;.is-focus]:ring-blue text-sm">
              <input
                placeholder="Enter your email"
                className="rizzui-input-field  w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </span>
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
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
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <div className="rizzui-password-root flex flex-col [&amp;>label>span]:font-medium">
          <label className="block">
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
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
        <div className="col-span-2 flex items-start text-black">
          <div className="rizzui-checkbox-root flex flex-col [&amp;>label>span]:font-medium [&amp;>label]:items-start">
            <label className="rizzui-checkbox-container flex flex-row items-center">
              <span className="relative leading-none">
                <input
                  className="rizzui-checkbox-input peer disabled:bg-gray-50 disabled:border-gray-200 h-5 w-5 rounded bg-transparent border border-gray-300 checked:!bg-gray-1000 focus:ring-gray-900/30 checked:!border-gray-1000 hover:enabled:border-gray-1000"
                  type="checkbox"
                  name="isAgreed"
                  value={formik.values.isAgreed}
                  onChange={formik.handleChange}
                />
               
              </span>
              <span className="rizzui-checkbox-label text-sm ml-1.5 rtl:mr-1.5">
                By signing up you have agreed to our{" "}
                <Link
                  className="font-medium text-blue transition-colors hover:underline"
                  href="/"
                >
                  Terms
                </Link>
                &amp;{" "}
                <Link
                  className="font-medium text-blue transition-colors hover:underline"
                  href="/"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {formik.errors.isAgreed && formik.touched.isAgreed && (
              <div className="text-red-500 text-sm">
                {formik.errors.isAgreed}
              </div>
            )}
          </div>
        </div>
        <button
          className="rizzui-button col-span-2 inline-flex font-medium items-center bg-gray-700 hover:enabled::bg-gray-800 active:enabled:bg-gray-1000 focus-visible:ring-gray-900/30 text-gray-0  text-white justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 px-5 py-2 text-base h-12 rounded-md border border-transparent focus-visible:ring-offset-2 bg-blue hover:enabled:bg-gray-900 focus-visible:ring-blue/30 text-white w-full"
          type="submit"
          disabled={!formik.isValid}
        >
          <span>Get Started</span>{" "}
          <ArrowForward       className="ms-2 mt-0.5 h-5 w-5"/>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
