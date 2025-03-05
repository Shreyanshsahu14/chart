import React, { useState, useEffect } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { data } from "./Data"; // Importing data
import DoughnutChart from "./components/DoughnutChart";
import Grid from "./components/Grid";
import DynamicDataTable from "./components/DynamicDataTable";

function App() {
  // Extract keys dynamically from the first object in data.js
  const dropdownOptions = Object.keys(data[0])
  .filter(key => !['userId', 'email', 'firstName', 'lastName'].includes(key));

  // State to hold the selected dropdown option and chart data
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0] || "");
  const [userdata, setUserdata] = useState({
    labels: [],
    datasets: [],
  });

  // Function to transform data based on the selected dropdown option
  const transformData = (option) => {
    if (!option) return { labels: [], datasets: [] };
  
    const valueCounts = {};
  
    data.forEach((item) => {
      const keyValue = item[option];
      
      // Handle array-type properties (roles, regions)
      if (Array.isArray(keyValue)) {
        keyValue.forEach(element => {
          // For nested objects (like roles/regions), use roleName/regionName
          const value = element[`${option.slice(0, -1)}Name`] || element;
          valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
      }
      // Handle string values
      else if (typeof keyValue === 'string') {
        valueCounts[keyValue] = (valueCounts[keyValue] || 0) + 1;
      }
      // Handle number values
      else if (typeof keyValue === 'number') {
        valueCounts['Total'] = (valueCounts['Total'] || 0) + keyValue;
      }
    });
  
    const labels = Object.keys(valueCounts);
    const datasetValues = Object.values(valueCounts);
  
    return {
      labels,
      datasets: [
        {
          label: `Distribution by ${option}`,
          data: datasetValues,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
          ],
        },
      ],
    };
  };

  // Update chart data when selected option changes
  useEffect(() => {
    setUserdata(transformData(selectedOption));
  }, [selectedOption]);

  return (
    <div>
      {/* Dropdown to select the data type */}
      <label>Select Data Type: </label>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        {dropdownOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <h2>Pie Chart</h2>
      <PieChart ChartData={userdata} />

      <h2>Bar Chart</h2>
      <BarChart ChartData={userdata} />

      <h2>Line Chart</h2>
      <LineChart ChartData={userdata} />
      <h2>Doughnut Chart</h2>
      <DoughnutChart ChartData={userdata} />
      <Grid ChartData={userdata} />
      <DynamicDataTable/>
    </div>
  );
}

export default App;
