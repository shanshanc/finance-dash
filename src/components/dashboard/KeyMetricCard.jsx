import 'react-loading-skeleton/dist/skeleton.css';

const KeyMetricCard = ({ isPositive, label, value, change }) => {
  return (
    <div className="metric-block flex-1 text-center">
      <div
        className="metric-label text-sm text-subtitle">{label}
      </div>
      <div
        className="metric-value mx-0 my-2.5 text-3xl font-bold text-primary">{value}
      </div>
      <span
        className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>{change}
      </span>
    </div>
  );
}

export default KeyMetricCard;