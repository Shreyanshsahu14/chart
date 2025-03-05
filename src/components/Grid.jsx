import React from 'react';

const Grid = ({ ChartData }) => {
  // Safely access data with fallbacks
  const labels = ChartData?.labels || [];
  const dataset = ChartData?.datasets?.[0] || { data: [] };
  
  // Combine labels with corresponding values
  const tableData = labels.map((label, index) => ({
    label,
    value: dataset.data[index] || 0
  }));

  return (
    <div className="grid-container" style={{ 
      margin: '20px 0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white'
      }}>
        <thead>
          <tr style={{ 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e9ecef'
          }}>
            <th style={{ 
              padding: '12px 16px',
              textAlign: 'left',
              color: '#495057'
            }}>Label</th>
            <th style={{ 
              padding: '12px 16px',
              textAlign: 'right',
              color: '#495057'
            }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} style={{
              borderBottom: index !== tableData.length - 1 
                ? '1px solid #e9ecef' 
                : 'none'
            }}>
              <td style={{
                padding: '12px 16px',
                color: '#212529'
              }}>{item.label}</td>
              <td style={{
                padding: '12px 16px',
                textAlign: 'right',
                color: '#212529',
                fontWeight: '500'
              }}>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {tableData.length === 0 && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#6c757d'
        }}>No data available</div>
      )}
    </div>
  );
};

export default Grid;