import React from 'react';
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart.js components
Chart.register(...registerables);

const LineChart = ({ ChartData }) => {
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
        labels: ChartData?.labels || ['January', 'February', 'March'], // X-axis labels (time-based data is typical for line charts)
        datasets: [
            {
                label: 'Dataset 1', // Line label
                data: ChartData?.datasets || [12, 34, 53], // Y-axis data points
                fill: false, // Don't fill the area under the line
                borderColor: generateRandomColors(ChartData?.datasets?.length || 1), // Line color
                tension: 0.4, // Controls the curve of the line (0.4 is a gentle curve)
                borderWidth: 2, // Line width
            },
        ],
    };

    // Line chart options
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                beginAtZero: true, // Ensures the X-axis starts from 0
            },
            y: {
                beginAtZero: true, // Ensures the Y-axis starts from 0
            },
        },
    };

    return (
        <div style={{ height: 300, width: 800 }}>
            <Line data={chartIncomeData} options={options} />
        </div>
    );
};

export default LineChart;
