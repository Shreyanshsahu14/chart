import React from 'react';
import { data } from '../Data';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const DynamicDataTable = () => {
  // Get all unique keys from the data
  const getAllKeys = () => {
    return data.reduce((keys, item) => {
      Object.keys(item).forEach(key => {
        if (!keys.includes(key)) keys.push(key);
      });
      return keys;
    }, []);
  };

  // Format nested values
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return 'None';
      if (typeof value[0] === 'object') {
        return value.map(item => {
          if (item.roleName) return item.roleName;
          if (item.regionName) return item.regionName;
          return JSON.stringify(item);
        }).join(', ');
      }
      return value.join(', ');
    }
    return value || 'N/A';
  };

  // Get sorted column keys
  const columns = getAllKeys().sort((a, b) => a.localeCompare(b));

  return (
    <div style={{
      margin: '20px 0',
      borderRadius: '8px',
      overflowX: 'auto',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        minWidth: '800px'
      }}>
        <thead>
          <tr style={{ 
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #e9ecef'
          }}>
            {columns.map(column => (
              <th key={column} style={{
                padding: '12px 16px',
                textAlign: 'left',
                color: '#495057',
                textTransform: 'capitalize'
              }}>
                {column.replace(/([A-Z])/g, ' $1')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.userId}
              style={{
                borderBottom: index !== data.length - 1 
                  ? '1px solid #e9ecef' 
                  : 'none'
              }}
            >
              {columns.map(column => (
                <td 
                  key={column}
                  style={{
                    padding: '12px 16px',
                    color: '#212529',
                    verticalAlign: 'top'
                  }}
                >
                  {formatValue(item[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#6c757d'
        }}>No data available</div>
      )}
    </div>
  );
};

export default DynamicDataTable;