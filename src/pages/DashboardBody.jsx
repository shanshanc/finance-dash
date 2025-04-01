import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

import KeyMetricCard from "../components/dashboard/KeyMetricCard";
import TrendingCardLine from "../components/dashboard/TrendingCardLine";
import './DashboardBody.css';

export default function DashboardBody() {
  const { metrics, isLoading } = useContext(DashboardContext);

  const hasData = metrics && metrics.length > 0;

  return (
    <div className="dashboard-body p-5">
      <div className="card full-width key-metrics-row">
        <div className="card-header">
          <div>
            <h3 className="card-title text-base m-0 font-semibold text-left">Financial Overview</h3>
            <p className="card-subtitle text-subtitle text-sm m-0 font-normal text-left">Year-end 2024</p>
          </div>
        </div>
        <div className="metric-row">
          <KeyMetricCard className="metric-block" isPositive={true} str={{metricLabel: "Net Income", metricValue: "$97.5B", metricChange: "+6.3% YoY"}} />
          <KeyMetricCard className="metric-block" isPositive={true} str={{metricLabel: "EPS", metricValue: "6.14", metricChange: "+9.2% YoY"}} />
          <KeyMetricCard className="metric-block" isPositive={false} str={{metricLabel: "P/E Ratio", metricValue: "28.4", metricChange: "-2.1% YoY"}} />
          <KeyMetricCard className="metric-block" isPositive={false} str={{metricLabel: "Debt to Assets", metricValue: "0.32", metricChange: "-0.05% YoY"}} />
        </div>
      </div>
      {hasData && <TrendingCardLine data={metrics.find((item) => item.id === "roe")} isLoading={isLoading} />}
      {hasData && <TrendingCardLine data={metrics.find((item) => item.id === "eps")} isLoading={isLoading} />}
      
    </div>
  );
}