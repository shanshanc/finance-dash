
const KeyMetricCard = ({ str, isPositive }) => {
  const { metricLabel, metricValue, metricChange } = str;
  return (
    <div className="metric-block flex-1 text-center">
      <div
        className="metric-label text-sm text-subtitle">{metricLabel}
      </div>
      <div
        className="metric-value mx-0 my-2.5 text-3xl font-bold text-primary">{metricValue}
      </div>
      <span
        className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>{metricChange}
      </span>
    </div>
  );
}

export default KeyMetricCard;