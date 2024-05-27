import React from 'react';
import Plot from 'react-plotly.js';
import './linechart.css'

const LineChart = (props) => {
  const { data } = props; 
  const yValues = data.map((item) => item.amount);
  const xValues=data.map((item)=>item.note)
  // Your chart data
  const dataa = [
    {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: 'Line Chart',
    },
  ];

  // Your chart layout
  const layout = {
   // title: 'Simple Line Chart',
    xaxis: {
      title: 'X-axis Label',
    },
    yaxis: {
      title: 'Y-axis Label',
    },
  };

  // Plot configuration to hide the mode bar (hover icons)
  const config = {
    displayModeBar: false,
  };

  return (
    <div className='lineContainer'>

      <Plot data={dataa} layout={layout} config={config} className='lineItem' />
    </div>
  );
};

export default LineChart;
