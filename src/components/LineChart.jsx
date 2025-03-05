import React from 'react';
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

const LineChart = ({ ChartData }) => {
  // Single color generator for the line
  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`;
  };

  // Safely access data with proper fallbacks
  const labels = ChartData?.labels || ['Q1', 'Q2', 'Q3', 'Q4'];
  const dataset = ChartData?.datasets?.[0] || { 
    data: [12, 34, 53, 42],
    label: 'Default Dataset'
  };

  // Proper dataset structure for Line chart
  const chartData = {
    labels,
    datasets: [{
      ...dataset,
      borderColor: dataset.backgroundColor || generateRandomColor(),
      backgroundColor: dataset.backgroundColor || generateRandomColor(),
      tension: 0.4,
      borderWidth: 2,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 8
    }]
  };

  // Enhanced chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Trend Analysis'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Values'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;