import React from "react";

const Button = ({ children, onClick, type = "button", fullWidth = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        fullWidth ? "w-full" : ""
      } bg-indigo-600 text-white font-bold py-2 px-4 rounded-[50px] mb-4 hover:bg-indigo-700 focus:outline-none focus:shadow-outline`}
    >
      {children}
    </button>
  );
};

export default Button;
