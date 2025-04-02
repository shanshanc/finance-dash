import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

import KeyMetricCard from "./KeyMetricCard";
import TrendingCard from "./TrendingCard";
import './Body.css';

export default function Body() {
  const { metrics, isLoading } = useContext(DashboardContext);

  const summaryMetrics = ['netIncome', 'eps', 'peRatio', 'debtToAssets'];

  return (
    <div className="dashboard-body p-5">
      <div className="card full-width key-metrics-row">
        <div className="card-header">
          <div>
            <h3 className="card-title text-base m-0 font-semibold text-left">Overview</h3>
            <p className="card-subtitle text-subtitle text-sm m-0 font-normal text-left">Year-end 2024</p>
          </div>
        </div>
        <div className="metric-row">
          {metrics && metrics
            .filter((metric) => summaryMetrics.includes(metric.id))
            .map((keyMetric) => (
              <KeyMetricCard
                key={keyMetric.id}
                className="metric-block"
                isPositive={keyMetric.isPositive}
                label={keyMetric.subTitle}
                value={keyMetric.formattedCurrentValue}
                change={keyMetric.periodChange}
              />
            ))
          }
        </div>
      </div>
      {metrics && metrics.map((item) => (
        <TrendingCard key={item.id} data={item} isLoading={isLoading} />
      ))}
    </div>
  );
}