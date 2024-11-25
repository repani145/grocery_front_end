import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./barcss.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraphCard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12, 19, 3, 5, 2, 3, 14, 18, 10, 15],
        backgroundColor: "#244888", // Matching dark blue from your palette
        borderColor: "#6c757d",    // Gray border for bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.1)" }, // Light grid lines
        ticks: { color: "#ffffff" }, // White y-axis labels
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" }, // Light grid lines
        ticks: { color: "#ffffff" }, // White x-axis labels
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: "#ffffff" }, // White legend labels
      },
    },
  };

  return (
    <div className="card bar-graph-card">
      <h5 className="card-title">Monthly Sales</h5>
      <div className="graph-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarGraphCard;
