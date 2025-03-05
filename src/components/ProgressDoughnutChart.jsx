import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const ProgressDoughnutChart = ({ progress }) => {
  // Calculate the percentage of progress
  const percentage = progress >= 100 ? 100 : progress < 0 ? 0 : progress;

  const data = {
    labels: ['Progress', 'Remaining'], // Two sections, one for progress and the other for remaining part
    datasets: [
      {
        data: [percentage, 100 - percentage], // The first part is the progress, second part is the remaining
        backgroundColor: ['#36A2EB', '#E4E4E4'], // Color of progress (blue) and remaining (light gray)
        borderWidth: 0, // Remove border between sections
      },
    ],
  };

  const options = {
    cutout: '70%', // Makes it a doughnut chart by cutting the center out
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Ensures the aspect ratio is maintained
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, // Show the percentage on the tooltip
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: 300, width: 300 }}>
      <Doughnut data={data} options={options} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '18px' }}>
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressDoughnutChart;
