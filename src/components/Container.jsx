import React, { useState, useRef, useEffect, memo } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import Grid from './Grid';

// Memoized chart components to prevent unnecessary re-renders
const MemoizedPieChart = memo(PieChart);
const MemoizedBarChart = memo(BarChart);
const MemoizedLineChart = memo(LineChart);
const MemoizedDoughnutChart = memo(DoughnutChart);
const MemoizedGrid = memo(Grid);

const Container = ({ 
  ChartType, 
  ChartData, 
  title, 
  style 
}) => {
  const renderContent = () => {
    switch(ChartType) {
      case 'pie':
        return <MemoizedPieChart ChartData={ChartData} />;
      case 'bar':
        return <MemoizedBarChart ChartData={ChartData} />;
      case 'line':
        return <MemoizedLineChart ChartData={ChartData} />;
      case 'doughnut':
        return <MemoizedDoughnutChart ChartData={ChartData} />;
      case 'grid':
        return <MemoizedGrid ChartData={ChartData} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      ...style, 
      position: 'relative',
      marginBottom: 40,
      padding: 16
    }}>
      {/* Header with title and icon */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <DropdownMenu title={title} />
      </div>

      {/* Chart content */}
      <div style={{ 
        width: '100%',
        height: `calc(100% - 40px)`
      }}>
        {renderContent()}
      </div>
    </div>
  );
};

// Separate dropdown component to isolate its state
const DropdownMenu = ({ title }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (action) => {
    setShowDropdown(false);
    console.log(`Selected action: ${action} for ${title}`);
    // Add your action handling logic here
  };

  return (
    <div 
      ref={dropdownRef}
      style={{
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <BsThreeDotsVertical 
        size={20} 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ padding: '4px' }}
      />
      
      {showDropdown && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '120px'
        }}>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              ':hover': { backgroundColor: '#f5f5f5' }
            }}
            onClick={() => handleOptionClick('edit')}
          >
            Edit
          </div>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              ':hover': { backgroundColor: '#f5f5f5' }
            }}
            onClick={() => handleOptionClick('delete')}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Container);