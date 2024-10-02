import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Skeleton } from "antd";
Chart.register(...registerables);

const MonthlyVariationChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<any>(null);

  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/finance/monthly-summary"
      );
      const monthlyData = response.data;

      const incomeData = Array(12).fill(0);
      const expenseData = Array(12).fill(0);

      monthlyData.income.forEach((item: any) => {
        incomeData[item._id.month - 1] = item.totalIncome;
      });

      monthlyData.expenses.forEach((item: any) => {
        expenseData[item._id.month - 1] = item.totalExpense;
      });

      setChartData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Income",
            data: incomeData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Total Expenses",
            data: expenseData,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    }
  };

  useEffect(() => {
    fetchMonthlySummary();
    const currentChartRef = chartRef.current;

    return () => {
      if (currentChartRef) {
        currentChartRef.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-center text-xl font-bold mb-6">
        Monthly Income and Expense Summary
      </h2>
      {chartData ? (
        <Bar
          className="mx-20"
          ref={chartRef}
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return "$" + value;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <Skeleton active paragraph={{ rows: 10 }} />
      )}
    </div>
  );
};

export default MonthlyVariationChart;
