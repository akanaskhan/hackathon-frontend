import React, { useState } from "react";
import LoanCard from "../components/ui/LoanCard";
import SubcategoryPopup from "../components/ui/SubcategoryPopup";
import LoanCalculator from "../components/ui/Calculator";

const loanCategories = [
  {
    title: "Wedding Loans",
    description: "Finance your dream wedding",
    subcategories: ["Valima", "Furniture", "Jewelry"],
  },
  {
    title: "Home Construction Loans",
    description: "Build your perfect home",
    subcategories: ["New Construction", "Renovation", "Extension"],
  },
  {
    title: "Business Startup Loans",
    description: "Kickstart your business venture",
    subcategories: ["Equipment", "Inventory", "Marketing"],
  },
  {
    title: "Education Loans",
    description: "Invest in your future",
    subcategories: ["Tuition", "Books", "Living Expenses"],
  },
];

function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClosePopup = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center my-16 ">
        Loan Application Platform
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {loanCategories.map((category, index) => (
          <LoanCard
            key={index}
            title={category.title}
            description={category.description}
            onClick={() => handleCardClick(category)}
          />
        ))}
      </div>
      {selectedCategory && (
        <SubcategoryPopup
          category={selectedCategory}
          onClose={handleClosePopup}
        />
      )}
      <LoanCalculator />
    </div>
  );
}

export default LandingPage;
