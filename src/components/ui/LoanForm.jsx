import React, { useState } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { message } from "antd";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    loanDetails: {
      loanCategory: "",
      loanSubcategory: "",
      loanAmount: "",
    },
    guarantor1: {
      name: "",
      email: "",
      cnic: "",
    },
    guarantor2: {
      name: "",
      email: "",
      cnic: "",
    },
    personalInfo: {
      name: "",
      email: "",
      cnic: "",
      phone: "",
      address: "",
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subcategories = {
    Wedding: ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction": ["Structure", "Finishing", "Loan"],
    "Business Startup": [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    Education: ["University Fees", "Child Fees Loan"],
  };

  const loanLimits = {
    Wedding: { maxLoan: 500000, period: "3 years" },
    "Home Construction": { maxLoan: 1000000, period: "5 years" },
    "Business Startup": { maxLoan: 1000000, period: "5 years" },
    Education: { maxLoan: "Based on requirement", period: "4 years" },
  };

  const handleInputChange = (e, section, field) => {
    setFormData((prev) => ({
      id: "67956ed9f2deca5bfc51599c",
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response = await fetch("http://localhost:4003/api/loan/loanrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      response = await response.json();
      console.log("Forgot password submitted:", formData);
      message.success(response.message);
      // window.location.href = "/";
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
    setIsSubmitted(true); // Set form as submitted
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const tokenNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit token
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const officeLocation = "Main Office: 123 Loan Street, Karachi, Pakistan";
    const qrCodeData = `Token: ${tokenNumber}\nDate: ${currentDate}\nTime: ${currentTime}\nOffice: ${officeLocation}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    doc.setFontSize(20);
    doc.text("Loan Slip", 10, 10);
    doc.setFontSize(14);
    doc.text(
      `Token Number: ${tokenNumber}\nCategory: ${formData.loanDetails.loanCategory}`,
      10,
      30
    );
    doc.text(`Date: ${currentDate}`, 10, 60);
    doc.text(`Time: ${currentTime}`, 10, 70);
    doc.text(`Office Location: ${officeLocation}`, 10, 80);
    doc.addImage(qrCodeImage, "PNG", 10, 110, 50, 50);
    doc.save(`LoanSlip_${tokenNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Loan Details Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loan Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Loan Details
            </h2>
            <select
              required
              onChange={(e) =>
                handleInputChange(e, "loanDetails", "loanCategory")
              }
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Wedding">Wedding Loans</option>
              <option value="Home Construction">Home Construction Loans</option>
              <option value="Business Startup">Business Startup Loans</option>
              <option value="Education">Education Loans</option>
            </select>

            {formData.loanDetails.loanCategory && (
              <select
                required
                onChange={(e) =>
                  handleInputChange(e, "loanDetails", "loanSubcategory")
                }
                className="mt-4 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subcategory</option>
                {subcategories[formData.loanDetails.loanCategory].map(
                  (subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  )
                )}
              </select>
            )}

            <input
              type="number"
              placeholder="Loan Amount (PKR)"
              className="mt-4 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                handleInputChange(e, "loanDetails", "loanAmount")
              }
            />

            {formData.loanDetails.loanCategory && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Max Loan:{" "}
                  {loanLimits[formData.loanDetails.loanCategory].maxLoan} <br />
                  Loan Period:{" "}
                  {loanLimits[formData.loanDetails.loanCategory].period}
                </p>
              </div>
            )}
          </div>

          {/* Guarantor Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Guarantor Info
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Guarantor 1 */}
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Guarantor 1
                </h3>
                <input
                  type="text"
                  placeholder="Name"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor1", "name")}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor1", "email")}
                />
                <input
                  type="text"
                  placeholder="CNIC"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor1", "cnic")}
                />
              </div>

              {/* Guarantor 2 */}
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Guarantor 2
                </h3>
                <input
                  type="text"
                  placeholder="Name"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor2", "name")}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor2", "email")}
                />
                <input
                  type="text"
                  placeholder="CNIC"
                  className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "guarantor2", "cnic")}
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Personal Info
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(e, "personalInfo", "name")}
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(e, "personalInfo", "email")}
            />
            <input
              type="text"
              placeholder="CNIC"
              className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(e, "personalInfo", "cnic")}
            />
            <input
              type="text"
              placeholder="Phone"
              className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(e, "personalInfo", "phone")}
            />
            <textarea
              placeholder="Address"
              className="mt-2 w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange(e, "personalInfo", "address")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <div className="text-center mb-4">
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Generate Slip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
