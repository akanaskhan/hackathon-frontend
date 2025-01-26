import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailOutline, LockOutlined, Google } from "@mui/icons-material";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import LogInImage from "../../assets/images/login.png";
import elips from "../../assets/images/Ellipse.png";
import ApiRoutes from "../../constants";
import { message } from "antd";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const { username } = formData;
      let response = await fetch(ApiRoutes.user.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      response = await response.json();
      setFormData({
        email: "",
        password: "",
      });
      console.log("Registration submitted:", response, formData);
      message.success(response.message);
      window.location.href = "/";

    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
    console.log("Login submitted:", formData);
  };

  return (
    <AuthLayout>
      <div className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0 overflow-hidden">
        <img src={elips} alt="elips" className="absolute right-0 top-0" />
        <div className="flex justify-center items-center h-full w-full md:order-1 order-2">
          <img
            src={LogInImage}
            alt="logIn page image"
            className="md:w-[50%] md:h-auto w-[70%] h-[90%] -rotate-[30deg] md:opacity-[1] opacity-[0.4] absolute top-0 z-0"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full px-10 order-1 md:order-2 z-10">
          {/* Login Page */}
          <div className="rounded-lg">
            <h1 className="w-full text-left font-bold text-4xl">LogIn</h1>
            <p className="w-full text-left my-5">
              LogIn to access your eCommerce journey
            </p>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="balama@gmail.com"
                icon={MailOutline}
              />
              <div>
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  icon={LockOutlined}
                />
                <div className="flex justify-end mt-1">
                  <Link
                    to="/auth/forgotpassword"
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Forgot?
                  </Link>
                </div>
              </div>
              <Button type="submit" fullWidth>
                Login now
              </Button>
              <Button type="button" variant="google" fullWidth>
                <Google className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
