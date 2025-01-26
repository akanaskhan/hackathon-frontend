import React from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const SlipGeneration = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Generate a token number
    const tokenNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit token

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Office location
    const officeLocation = "Main Office: 123 Loan Street, Karachi, Pakistan";

    // Generate QR Code
    const qrCodeData = `Token: ${tokenNumber}\n
    Date: ${currentDate}\nTime: ${currentTime}\n
    Office: ${officeLocation}\n
    Category: ${category}\n
    form data: ${formData}\n
    form data: ${formData}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text("Loan Slip", 10, 10);

    // Add Token Number
    doc.setFontSize(14);
    doc.text(`Token Number: ${tokenNumber}\n`, 10, 30); // Corrected here
    doc.text(`Category: ${category}`, 10, 40); // Corrected here
    doc.text(`form data: ${formData}`, 10, 50); // Corrected here
    doc.text(`form data: ${formData}`, 10, 60); // Corrected here

    // Add Date and Time
    doc.text(`Date: ${currentDate}`, 10, 70); // Corrected here
    doc.text(`Time: ${currentTime}`, 10, 80); // Corrected here

    // Add Office Location
    doc.text(`Office Location: ${officeLocation}`, 10, 90); // Corrected here

    // Add QR Code
    doc.addImage(qrCodeImage, "PNG", 10, 110, 50, 50); // Adjust position and size

    // Save the PDF
    doc.save(`LoanSlip_${tokenNumber}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition"
    >
      Generate Slip
    </button>
  );
};

export default SlipGeneration;
