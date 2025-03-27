import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardBody({ data }) {
  const options = {
    scales: { y: { title: { display: true, text: "ROE" } } },
    plugins: { title: { display: true, text: "AAPL Key Metrics" } },
  };

  return (
    <div className="dashboard-body p-5">
      <div className="card full-width">
        <div className="card-header">
          <div>
            <h3 className="card-title">Financial Overview</h3>
            <p className="card-subtitle">Year ending Dec 31, 2023</p>
          </div>
        </div>
      </div>
      <div className="card third-width profit">
        <div className="card-header">
          <div>
            <h3 className="card-title">Gross Profit Ratio</h3>
            <p className="card-subtitle">毛利率</p>
          </div>
        </div>
        <div className="metric-value">43.2%</div>
        <span className="metric-change positive">1.5% YoY</span>
        <div className="chart-container">
          <div style={{ maxWidth: "800px", margin: "20px auto" }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}