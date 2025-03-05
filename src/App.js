import React, { useState, useEffect } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { data } from "./Data"; // Importing data

function App() {
  // Extract keys dynamically from the first object in data.js
  const dropdownOptions = Object.keys(data[0] || {});

  // State to hold the selected dropdown option and chart data
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0] || "");
  const [userdata, setUserdata] = useState({
    labels: [],
    datasets: [],
  });

  // Function to transform data based on the selected dropdown option
  const transformData = (option) => {
    if (!option) return { labels: [], datasets: [] };

    let labels = [];
    let datasetValues = [];
    const valueCounts = {};

    data.forEach((item) => {
      const keyValue = item[option];

      if (typeof keyValue === "string") {
        valueCounts[keyValue] = (valueCounts[keyValue] || 1) + 1;
      } else if (typeof keyValue === "number") {
        valueCounts["Total"] = (valueCounts["Total"] || 0) + keyValue;
      }
    });

    labels = Object.keys(valueCounts);
    datasetValues = Object.values(valueCounts);

    return {
      labels,
      datasets: [
       // {
          //label: `Data for ${option}`,
           datasetValues
       // },
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
    </div>
  );
}

export default App;
