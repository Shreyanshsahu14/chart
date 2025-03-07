import React, { useState, useEffect } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { data } from "./Data";
import DoughnutChart from "./components/DoughnutChart";
import Grid from "./components/Grid";
import DynamicDataTable from "./components/DynamicDataTable";
import Container from "./components/Container";

function App() {
  const dropdownOptions = Object.keys(data[0])
    .filter(key => !['userId', 'email', 'firstName', 'lastName'].includes(key));
  
  const Widthoptions = ['20%', '40%', '60%', '80%', '100%'];
  const [ChartWidth, setChartWidth] = useState('100%');
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0] || "");
  const [userdata, setUserdata] = useState({ labels: [], datasets: [] });

  const transformData = (option) => {
    if (!option) return { labels: [], datasets: [] };
    const valueCounts = {};

    data.forEach((item) => {
      const keyValue = item[option];
      if (Array.isArray(keyValue)) {
        keyValue.forEach(element => {
          const value = element[`${option.slice(0, -1)}Name`] || element;
          valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
      } else if (typeof keyValue === 'string') {
        valueCounts[keyValue] = (valueCounts[keyValue] || 0) + 1;
      } else if (typeof keyValue === 'number') {
        valueCounts['Total'] = (valueCounts['Total'] || 0) + keyValue;
      }
    });

    return {
      labels: Object.keys(valueCounts),
      datasets: [{
        label: `Distribution by ${option}`,
        data: Object.values(valueCounts),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
        ],
      }],
    };
  };

  useEffect(() => {
    setUserdata(transformData(selectedOption));
  }, [selectedOption]);

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <div style={{ marginBottom: 20 }}>
        <label>Select Data Type: </label>
        <select 
          value={selectedOption} 
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ marginRight: 20 }}
        >
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

        <label>Select Chart Width: </label>
        <select 
          value={ChartWidth} 
          onChange={(e) => setChartWidth(e.target.value)}
        >
          {Widthoptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div style={{ height: "100%" }}>
        <Container 
          ChartType="pie" 
          ChartData={userdata} 
          title="Pie Chart" 
          style={{ width: ChartWidth }}
        />
        
        <Container 
          ChartType="bar" 
          ChartData={userdata} 
          title="Bar Chart" 
          style={{ width: ChartWidth }}
        />
        
        <Container 
          ChartType="line" 
          ChartData={userdata} 
          title="Line Chart" 
          style={{ width: ChartWidth }}
        />
        
        <Container 
          ChartType="doughnut" 
          ChartData={userdata} 
          title="Doughnut Chart" 
          style={{ width: ChartWidth }}
        />
        
        <Container 
          ChartType="grid" 
          ChartData={userdata} 
          title="Data Grid" 
          style={{ width: ChartWidth }}
        />
      </div>

      <DynamicDataTable />
      
      {data.length === 0 && (
        <div className="error">Error: No data available</div>
      )}
    </div>
  );
}

export default App;