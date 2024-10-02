import React, { useState, useEffect } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrencySelector from "./CurrencySelector";
import MonthlyVariationChart from "./MonthlyVariationChart";
import { fetchEntries } from "../store/entriesSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Spin } from "antd";

interface CardProps {
  title: string;
  value: number;
  currencySymbol: string;
  onClick: () => void;
}

const InfoCard: React.FC<CardProps> = ({
  title,
  value,
  currencySymbol,
  onClick,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col w-80 h-36">
      <div>
        <AppstoreAddOutlined
          className="cursor-pointer text-blue-500 hover:text-blue-700 mb-2"
          onClick={onClick}
        />
      </div>
      <h2 className="mb-2 mt-auto">{title}</h2>
      <span className="text-xl font-semibold">
        {currencySymbol} {value}
      </span>
    </div>
  );
};

const Cards: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { incomeData, expenseData, loading } = useSelector((state: any) => ({
    incomeData: state.entries.incomeData,
    expenseData: state.entries.expenseData,
    loading: state.entries.loading,
  }));

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const totalIncome = loading
    ? 0
    : incomeData.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const totalExpense = loading
    ? 0
    : expenseData.reduce((acc: number, curr: any) => acc + curr.amount, 0);

  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "USD",
    symbol: "$",
  });

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="h-auto">
      <div className="flex flex-col items-center">
        <div className="self-end mb-4">
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        </div>

        {loading ? (
          <div>
            <Spin />
          </div>
        ) : (
          <div className="flex space-x-4">
            <div className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col w-80 h-36">
              <h2 className="text-xl font-bold mb-2">Total Balance</h2>
              <div className="mt-4 text-gray-600">Total Income - Expenses</div>
              <span className="text-xl font-semibold">
                {selectedCurrency.symbol} {totalBalance}
              </span>
            </div>

            <InfoCard
              title="Income"
              value={totalIncome}
              currencySymbol={selectedCurrency.symbol}
              onClick={() => navigate("/budget-planner")}
            />

            <InfoCard
              title="Expense"
              value={totalExpense}
              currencySymbol={selectedCurrency.symbol}
              onClick={() => navigate("/budget-planner")}
            />
          </div>
        )}
      </div>

      <div className="mt-28">
        <MonthlyVariationChart />
      </div>
    </div>
  );
};

export default Cards;
