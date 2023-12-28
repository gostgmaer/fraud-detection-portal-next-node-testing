"use client";
import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const PasswordField = ({ value, handleChange, placeholder, name ,...rest}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full border rounded-md focus:outline-none focus:border-blue-500 flex items-center justify-between">
      <input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        className="w-full px-4 py-2 placeholder:text-sm  border-none rounded-md focus:outline-none focus:border-blue-500 pr-0"
        placeholder={placeholder ? placeholder : "Enter password"}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        required
        {...rest}
      />

      <button className="px-2" type="button" onClick={togglePasswordVisibility}>
        {showPassword ? (
          <FaEyeSlash className=" w-5 h-5" onClick={togglePasswordVisibility} />
        ) : (
          <FaEye className="w-5 h-5" onClick={togglePasswordVisibility} />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
