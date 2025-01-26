import React from "react";

function LoanCard({ title, description, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LoanCard;
