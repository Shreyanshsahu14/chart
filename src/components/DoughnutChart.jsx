import React from 'react';
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);

const DoughnutChart = ({ ChartData }) => {
  // Consistent color palette with other charts
  const defaultColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
  ];

  // Safely access data with proper fallbacks
  const labels = ChartData?.labels || ['Category 1', 'Category 2', 'Category 3'];
  const dataset = ChartData?.datasets?.[0] || { 
    data: [30, 40, 30],
    label: 'Default Dataset'
  };

  // Configure chart data
  const chartData = {
    labels,
    datasets: [{
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors.slice(0, labels.length),
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 8,
      cutout: '60%' // Adjust doughnut thickness
    }]
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribution Chart'
      },
      tooltip: {
        enabled: true,
        position: 'nearest'
      }
    }
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;