import React from "react";

const TextField = ({
  label,
  type,
  placeholder,
  additionalAttrs,
  value,
  onChange,
  classes,
  icon,
  id,
}) => {
  return (
    <div className=" flex flex-col w-full">
      <label className="block">
        <span className=" block text-lg mb-1.5">{label}</span>
        <span className=" flex items-center peer bg-white w-full transition duration-200 px-3.5 py-1 text-sm h-10 leading-[40px] rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-1000 [&amp;.is-focus]:border-gray-1000 [&amp;.is-focus]:ring-gray-1000">
          {icon && <button className=" text-gray-500 pr-1">{icon}</button>}
          <input
            className={` appearance-none  border-none rounded w-full  text-gray-700 leading-tight focus:outline-none  ${classes}`}
            type={type}
            placeholder={placeholder}
            name={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            id={id ? id : label.trim().replace(/\s+/g, "_").toLowerCase()}
            value={value}
            onChange={onChange}
            {...additionalAttrs} // Spread additional attributes/props
          />
        </span>
     
      </label>
    </div>
  );
};

export default TextField;
