import React from 'react';
import Plot from 'react-plotly.js';
import './PieChart.css'; // Import the CSS file for styling

const PieChart = (props) => {
  const { data } = props; 
  const yValues = data.map((item) => item.amount);
  const xValues=data.map((item)=>item.item)
  // Your chart data (modified for a Pie Chart)
  const dataa = [
    {
      labels: xValues,
      values: yValues,
      type: 'pie', // Set type to 'pie' for a Pie Chart
      name: 'Pie Chart',
    },
  ];

  // Your chart layout
  const layout = {
    title: 'Simple Pie Chart',
  };

  // Plot configuration to hide the mode bar (hover icons)
  const config = {
    displayModeBar: false,
  };

  return (
    <div className="pie-chart-container">
      <Plot data={dataa} layout={layout} config={config} className='piechart' />
    </div>
  );
};

export default PieChart;
