import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MailOutline,
  LockOutlined,
  PersonOutline,
  Google,
} from "@mui/icons-material";
import AuthLayout from "../../components/layout/AuthLayout.jsx";
import InputField from "../../components/common/InputField.jsx";
import Button from "../../components/common/Button.jsx";
import SignUpImage from "../../assets/images/Illustration.png";
import elips from "../../assets/images/Ellipse.png";
import { ApiRoutes } from "../../constants/index.js";
import { message } from "antd";
const UpdatePasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { newPassword, confirmPassword } = formData;
      if (newPassword == confirmPassword) {
        let response = await fetch(ApiRoutes.user.updatePassword, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.confirmPassword,
          }),
        });
        response = await response.json();
        setFormData({
          newPassword: "",
          email: "",
          confirmPassword: "",
        });
        message.success(response.message);
        window.location.href = "/";
        console.log("Registration submitted:", response, formData);
      } else {
        message.error(
          "New password and confirmation do not match. Please ensure both fields are identical."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0">
        <img src={elips} alt="elips" className="absolute left-0 -top-[3%]" />
        <div className="flex justify-center items-center h-full w-full md:order-1 order-2">
          <img
            src={SignUpImage}
            alt="logIn page image"
            className="md:w-[45%] h-auto w-[55%]  rotate-[30deg] md:opacity-[1] opacity-[0.4] absolute top-[50%] -translate-y-[50%] z-0"
          />
        </div>
        <div className="md:ml-20 flex flex-col justify-center items-center h-full w-full md:w-[90%] px-10 z-10 ">
          <h1 className="w-full text-left font-bold text-4xl">
            Update Password
          </h1>
          <p className="w-full text-left my-5">
            To continue, please update your password. You will not be able to
            proceed without updating it.
          </p>
          {/* REGISTRATION FORM */}

          <form
            className="rounded-lg md:w-[100%] w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="balama@gmail.com"
              icon={MailOutline}
            />
            <InputField
              label="New Password"
              type="text"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your Password"
              icon={PersonOutline}
            />

            <InputField
              label="Confirm Password"
              type="number"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your Password"
              icon={LockOutlined}
            />
            <Button type="submit" fullWidth>
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UpdatePasswordPage;
