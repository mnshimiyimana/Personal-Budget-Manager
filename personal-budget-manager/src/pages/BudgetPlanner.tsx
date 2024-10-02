import React from "react";
import Budgetplanner from "../components/BudgetPlanner";
import { InfoCircleOutlined } from "@ant-design/icons";
const BudgetPlanner: React.FC = () => {
  return (
    <div>
      <div className="flex text-xl font-bold space-x-2">
        <h1>Recent Transactions</h1>
        <InfoCircleOutlined />
      </div>

      <Budgetplanner />
    </div>
  );
};

export default BudgetPlanner;
