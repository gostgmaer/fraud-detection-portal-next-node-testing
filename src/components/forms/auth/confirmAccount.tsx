
"use client";
import { useAuthContext } from "@/context/AuthContext";
import { post } from "@/lib/network/http";
import { useAxios } from "@/lib/network/interceptors";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ConfirmForm = () => {
  const { handleLoginAuth, user, userId } = useAuthContext();
  const router = useRouter();
  const [axios, spinner] = useAxios();
  const [userData, setUserData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const param = useSearchParams();

  const confirmAccountAction = async (e) => {
    if (!param.getAll("token")[0]) {
    } else {
      try {
        const confirm = await post(
          `/user/auth/confirm-account/${param.getAll("token")[0]}`
        );
        setUserData(confirm);
      } catch (error) {
       // console.log(error.message);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    confirmAccountAction();
  }, []);

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {userData && userData.message}
          {/* Account Confirmed! */}
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Thank you for confirming your account. You can now access our
          services.
        </p>
      </div>
      {spinner}
    </div>
  );
};

export default ConfirmForm;
