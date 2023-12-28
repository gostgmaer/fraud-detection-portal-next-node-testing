import React from "react";

const Input = ({
  label,
  type,
  additionalAttrs,
  classes,
  icon,
  id,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="block">
        <span className=" block text-sm capitalize font-semibold text-gray-600 mb-1.5">{label} : </span>
        <span className=" flex items-center peer bg-white w-full transition duration-200 px-3.5   h-10 leading-[40px] rounded-md bg-transparent focus:ring-[0.6px] border border-gray-300 placeholder:text-gray-500 hover:border-gray-900 focus:border-gray-900  focus:bg-gray-950">
          {icon && <button className=" text-gray-500 pr-1">{icon}</button>}
          <input
            className={` rounded w-full  text-gray-700 leading-tight focus:outline-none  ${classes}`}
            type={type}
            name={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            id={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            {...additionalAttrs} // Spread additional attributes/props
          />
        </span>
      </label>
    </div>
  );
};

export default Input;
