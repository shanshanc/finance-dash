import { CHART_TYPES } from "../../constants/dataTypes";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";

const TrendingCard = ({ data, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;

  const chartType = CHART_TYPES.LINE.includes(data.id) ? 'line' : 'bar';

  return (
    <div className="card metric-block col-span-12 lg:col-span-4">
      <div className="card-header">
        <div>
          <h3 className="card-title text-base m-0 font-semibold text-left">{data.subTitle}</h3>
          <p className="card-subtitle text-subtitle text-sm m-0 font-normal text-left">{data.subTitleZhTw}</p>
        </div>
      </div>
      <div className="metric-value">{data.formattedCurrentValue}</div>
      <span className={`metric-change ${data.isPositive ? 'positive' : 'negative'}`}>{data.periodChange}% YoY</span>
      <div className="chart-container">
        {chartType === 'line' ? <LineChart data={data} isLoading={isLoading} /> : <BarChart data={data} isLoading={isLoading} />}
      </div>
    </div>
  );
};

export default TrendingCard;
