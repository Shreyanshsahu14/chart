import React, { useState, useEffect } from "react";
import { data } from './Data';
import { transformData } from "../src/components/utils/transformdata";
import Container from "./components/Container";
import DynamicDataTable from "./components/DynamicDataTable";

const App = () => {
  const dropdownOptions = data.length > 0 
    ? Object.keys(data[0]).filter(
        (key) => !["userId", "email", "firstName", "lastName"].includes(key)
      )
    : [];

  const [selectedOption, setSelectedOption] = useState(
    dropdownOptions.length > 0 ? dropdownOptions[0] : ""
  );
  const [chartWidth, setChartWidth] = useState("40%");
  const [userdata, setUserdata] = useState({ 
    labels: [], 
    datasets: [{
      label: '',
      data: [],
      backgroundColor: []
    }] 
  });

  const visualizations = [
    { type: 'pie', title: 'Pie Chart' },
    { type: 'bar', title: 'Bar Chart' },
    { type: 'line', title: 'Line Chart' },
    { type: 'doughnut', title: 'Doughnut Chart' },
    { type: 'grid', title: 'Data Grid' },
    { type: 'datatable', title: 'Data Table' }
  ];

  const [selectedChartType, setSelectedChartType] = useState(visualizations[0].type);

  useEffect(() => {
    const transformedData = transformData(selectedOption, data);
    setUserdata({
      labels: transformedData.labels,
      datasets: transformedData.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
        ]
      }))
    });
  }, [selectedOption]);

  const selectedViz = visualizations.find(viz => viz.type === selectedChartType);

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
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>Select Chart Width: </label>
        <select 
          value={chartWidth} 
          onChange={(e) => setChartWidth(e.target.value)}
          style={{ marginRight: 20 }}
        >
          {["20%", "40%", "60%", "80%", "100%"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <label>Select Chart Type: </label>
        <select
          value={selectedChartType}
          onChange={(e) => setSelectedChartType(e.target.value)}
        >
          {visualizations.map((viz) => (
            <option key={viz.type} value={viz.type}>
              {viz.title}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: "100%" }}>
        {selectedViz && (
          selectedViz.type === 'datatable' ? (
            <div 
              style={{ 
                width: chartWidth, 
                marginBottom: 40,
                backgroundColor: "#E0E8F0",
                overflowX: 'auto'
              }}
            >
              <h2>{selectedViz.title}</h2>
              <DynamicDataTable data={data} />
            </div>
          ) : (
            <Container
              ChartType={selectedViz.type}
              ChartData={userdata}
              title={selectedViz.title}
              style={{ 
                width: chartWidth, 
                marginBottom: 40,
                backgroundColor: "#E0E8F0"
              }}
            />
          )
        )}
      </div>

      {data.length === 0 && (
        <div className="error">Error: No data available</div>
      )}
    </div>
  );
};

export default App;