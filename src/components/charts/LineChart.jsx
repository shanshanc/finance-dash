import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const customCanvasBackgroundColor = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#f3f4f6'; // default light grey
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

// Register the custom plugin
ChartJS.register(customCanvasBackgroundColor);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false // removes x-axis grid lines
        },
        display: true
      },
      y: {
        grid: {
          display: false // removes y-axis grid lines
        },
        title: { 
          display: true, 
          text: data.name 
        }
      }
    },
    plugins: {
      title: {
        display: false,
        text: "AAPL Key Metrics"
      },
      legend: {
        display: false
      },
      customCanvasBackgroundColor: {
        color: '#f3f4f6',
      }
    },
    backgroundColor: 'rgb(239, 47, 47)'
  };

  const chartData = {
    labels: data.periods.map((period) => period.substring(0, 4)),
    datasets: [{
        label: data.name,
        data: data.values,
        backgroundColor: "#2ecc7126",
        borderColor: "#57cc99",
        borderWidth: 1,
    }],
  }
  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default LineChart;
