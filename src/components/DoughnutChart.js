import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  incomeLabel,
  expenseLabel,
  incomeTotal,
  expenseTotal,
}) => {
  const data = {
    labels: [incomeLabel, expenseLabel],
    datasets: [
      {
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#10B981", "#EF4444"],
        hoverBackgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: false,
      text: "Transaction Pie Chart",
    },
  };

  return (
    <div className="relative bg-white rounded shadow-xl py-5 border-radius h-96">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
