import React from 'react'
import PieChart from './PieChart'
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import Grid from './Grid';
const Container = ({ChartType,ChartData,title,style}) => {
    const renderChart=()=>{
        switch(ChartType){
            case 'pie':
                return <PieChart ChartData={ChartData}/>
                case 'bar':
                    return <BarChart ChartData={ChartData} />;
                  case 'line':
                    return <LineChart ChartData={ChartData} />;
                  case 'doughnut':
                    return <DoughnutChart ChartData={ChartData} />;
                  case 'grid':
                    return <Grid ChartData={ChartData} />;
                  default:
                    return null;
                }
              };
  return (
    <div style={{...style,marginBottom:40}}>
      <p>Edit</p>
        <h2>{title}</h2>
        <div style={style}>
            {renderChart()}
        </div>
        
    </div>
  )
}

export default Container