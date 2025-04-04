import { useContext } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { DashboardContext } from "../../context/DashboardContext";
import KeyMetricCard from "./KeyMetricCard";
import TrendingCard from "./TrendingCard";
import RowSkeleton from "../RowSkeleton";
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
          {isLoading ? (
              <Skeleton count={3} className="w-full" />
          ) : metrics && metrics.length > 0 ? (
              metrics && metrics
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
          ) : ( <p>No metrics available.</p> )}
        </div>
      </div>
      {isLoading && <RowSkeleton numCards={3} />}
      {metrics && metrics.map((item) => (
        <TrendingCard key={item.id} data={item} isLoading={isLoading} />
      ))}
    </div>
  );
}