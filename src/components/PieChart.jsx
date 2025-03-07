import React from 'react';
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);

const PieChart = ({ ChartData }) => {
  // Improved color generation function
  const generateRandomColors = (numColors) => {
    return Array.from({ length: numColors }, () => 
      `rgb(${Math.floor(Math.random() * 256)}, 
       ${Math.floor(Math.random() * 256)}, 
       ${Math.floor(Math.random() * 256)})`
    );
  };

  // Safely access data with proper fallbacks
  const labels = ChartData?.labels || ['Red', 'Blue', 'Green'];
  const dataset = ChartData?.datasets?.[0] || { data: [12, 34, 53] };
  
  // Correct dataset structure for Chart.js
  const chartData = {
    labels,
    datasets: [{
      ...dataset,
      backgroundColor: generateRandomColors(dataset.data?.length || 3),
      hoverOffset: 4
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution Chart'
      },
    }
  };

  return (
    <div style={{ height: 300 }}>
      <Pie
        data={chartData}
        options={options}
       
      />
    </div>
  );
};

export default PieChart;