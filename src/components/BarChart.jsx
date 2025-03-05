import React from 'react';
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
Chart.register(...registerables);

const BarChart = ({ ChartData }) => {
  // Log the data each time it changes
  console.log('ChartData has been updated:', ChartData);

  // Function to generate random colors
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Chart data, falling back to default values if necessary
  const chartIncomeData = {
    labels: ChartData?.labels || ['Red', 'Blue', 'Green'], // X-axis labels
    datasets: [
      {
        label: 'Dataset 1', // You can change this to something meaningful
        data: ChartData?.datasets || [12, 34, 53], // Y-axis data
        backgroundColor: generateRandomColors(ChartData?.datasets?.length || 3), // Bar colors
        borderColor: generateRandomColors(ChartData?.datasets?.length || 3), // Border colors
        borderWidth: 1, // Optional: controls border thickness
      },
    ],
  };

  // Bar chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true, // Ensures bars start from 0
      },
      y: {
        beginAtZero: true, // Ensures bars start from 0 on the Y-axis
      },
    },
  };

  return (
    <div style={{ height: 300, width:800 }}>
      <Bar data={chartIncomeData} options={options} />
    </div>
  );
};

export default BarChart;
