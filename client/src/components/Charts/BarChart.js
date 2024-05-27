import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = (props) => {

  const { data } = props; 
  const yValues = data.map((item) =>parseInt(item.amount));
  const xValues=data.map((item)=>item.note)

const sum = yValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const dataa = [
    {
      x: xValues,
      y: yValues
      ,
      type: 'bar', 
      name: 'Bar Chart',
    },
  ];

  // Your chart layout
  const layout = {
    title: `Total ${sum}`,
    xaxis: {
     // title: 'X-axis Label',
    },
    yaxis: {
      title: '',
    },
  };

  // Plot configuration to hide the mode bar (hover icons)
  const config = {
    displayModeBar: false,
  };

  return (
    <div >
      <Plot data={dataa} layout={layout} config={config} style={{ width: 'inherit', height: '300px' }} className='barchart' />
    </div>
  );
};

export default BarChart;
