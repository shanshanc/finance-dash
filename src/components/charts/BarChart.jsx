import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

ChartJS.register(customCanvasBackgroundColor);

function BarChart({ data, isLoading }) {
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
        text: "Key Metrics"
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

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
