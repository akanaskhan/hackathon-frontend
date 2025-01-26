import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailOutline } from "@mui/icons-material";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import LogInImage from "../../assets/images/forgotPassword.png";

import elips from "../../assets/images/Ellipse.png";
import ApiRoutes from "../../constants";
import { message } from "antd";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("EMAIL =>", email);
      let response = await fetch(ApiRoutes.user.forgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      response = await response.json();
      console.log("Forgot password submitted:", email);
      setEmail("");
      message.success(response.message);
      window.location.href = "/";

    } catch (error) {
      message.error(response.message);
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0 overflow-hidden">
        <img
          src={elips}
          alt="elips"
          className="absolute left-0 bottom-0 rotate-180"
        />

        <div className="flex justify-center items-center h-full w-full md:order-1 order-2">
          <img
            src={LogInImage}
            alt="logIn page image"
            className="md:w-[50%] md:h-auto w-[70%] h-[90%] -rotate-[30deg] md:opacity-[1] opacity-[0.4] absolute top-0 z-0"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full px-10 order-1 md:order-2 z-10">
          {/* Forgot Password */}
          <div>
            <h1 className="w-full text-left font-bold text-4xl">
              Forgot Your Password?
            </h1>
            <p className="w-full text-left my-5">
              Don't worry, happens to all of us. Enter your email below to{" "}
              <br />
              recover your password.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="balama@gmail.com"
                icon={MailOutline}
              />
              <Button type="submit" fullWidth>
                Send reset link
              </Button>
              <div className="text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
