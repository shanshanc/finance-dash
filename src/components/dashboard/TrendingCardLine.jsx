import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import LineChart from "../charts/LineChart";
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

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

const TrendingCardLine = ({ data, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="card third-width">
      <div className="card-header">
        <div>
          <h3 className="card-title text-base m-0 font-semibold text-left">{data.subTitle}</h3>
          <p className="card-subtitle text-subtitle text-sm m-0 font-normal text-left">{data.subTitleZhTw}</p>
        </div>
      </div>
      <div className="metric-value">{data.formattedCurrentValue}</div>
      <span className={`metric-change ${data.isPositive ? 'positive' : 'negative'}`}>{data.periodChange}% YoY</span>
      <div className="chart-container">
        <LineChart data={data} />
      </div>
    </div>
  );
};

export default TrendingCardLine;
