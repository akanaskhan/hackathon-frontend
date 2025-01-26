import React from "react";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen  bg-gray-50 ">
      <div>
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
