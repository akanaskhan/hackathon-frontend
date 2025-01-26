import React, { useState } from "react";
import { Card } from "antd";
import { Button, Input, Select } from "antd";

const { Option } = Select;

const LoanCalculator = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [desiredLoan, setDesiredLoan] = useState("");
  const [calculatedLoan, setCalculatedLoan] = useState(null);

  const categories = {
    "Wedding Loans": ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction Loans": ["Structure", "Finishing", "Loan"],
    "Business Startup Loans": [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    "Education Loans": ["University Fees", "Child Fees Loan"],
  };

  const handleCalculate = () => {
    if (
      !category ||
      !subcategory ||
      !initialDeposit ||
      !loanPeriod ||
      !desiredLoan
    ) {
      alert("Please fill all fields");
      return;
    }

    const maxLoan = category === "Wedding Loans" ? 500000 : 1000000;
    const loanAmount = Math.min(desiredLoan, maxLoan - initialDeposit);
    const monthlyInstallment = (loanAmount / (loanPeriod * 12)).toFixed(2);

    setCalculatedLoan({ loanAmount, monthlyInstallment });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card
        title="Loan Calculator"
        className="w-full max-w-lg shadow-lg rounded-2xl"
      >
        <div className="mb-4">
          <Select
            className="w-full"
            placeholder="Select Loan Category"
            onChange={(value) => setCategory(value)}
          >
            {Object.keys(categories).map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </div>

        {category && (
          <div className="mb-4">
            <Select
              className="w-full"
              placeholder="Select Subcategory"
              onChange={(value) => setSubcategory(value)}
            >
              {categories[category].map((sub) => (
                <Option key={sub} value={sub}>
                  {sub}
                </Option>
              ))}
            </Select>
          </div>
        )}
        <div className="mb-4">
          <Input
            type="number"
            placeholder="Desired Loan Amount (PKR)"
            value={desiredLoan}
            onChange={(e) => setDesiredLoan(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="number"
            placeholder="Initial Deposit (PKR)"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Input
            type="number"
            placeholder="Loan Period (Years)"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          />
        </div>

        <Button type="primary" className="w-full" onClick={handleCalculate}>
          Calculate
        </Button>

        {calculatedLoan && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">Calculation Result:</h3>
            <p>Loan Amount: PKR {calculatedLoan.loanAmount.toLocaleString()}</p>
            <p>Monthly Installment: PKR {calculatedLoan.monthlyInstallment}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoanCalculator;
