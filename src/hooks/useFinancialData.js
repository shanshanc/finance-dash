import { useMemo } from 'react';
import useSWR from 'swr';
import FinancialService from '../services/financialService';
import { METRIC_TYPES } from '../constants/metricTypes';

async function fetcher(key) {
  const [_, symbol, period] = key;

  try {
    const data = await FinancialService.getFinancialMetrics(symbol, period);

    return data;
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
}

export const useFinancialData = (symbol, period) => {
  const { data, isLoading, error } = useSWR(
    // Only fetch if we have both symbol and period
    symbol && period ? [`financial-data`, symbol, period] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 0,
      revalidateIfStale: true,
      revalidateOnMount: true,
      refreshInterval: 0,
      onError: (err) => {
        console.error('useSWR error:', err);
      },
      onSuccess: (data) => {
        console.log('useSWR success:', data);
      }
    }
  );

  // Memoize calculations to prevent unnecessary recalculations
  const transformedData = useMemo(() => {
    if (!data) return null;
    
    // Transform the data with additional formatting
    const result = data.map(item => {
      // Calculate period-over-period change
      const len = item.values.length;
      const values = item.values;
      const currentValue = values[len-1];
      const previousValue = values[len-2];
      const periodChange = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;

      return {
        ...item,
        formattedValues: values.map(value => value.toFixed(2)),
        periodChange: periodChange.toFixed(2),
        isPositive: periodChange >= 0,
        // Format the current value based on the metric type
        formattedCurrentValue: formatMetricValue(currentValue, item.id)
      };
    });

    return result;
  }, [data]);

  return { metrics: transformedData, isLoading, error };
};

// Helper function to format currency values
function formatCurrency(value) {
  if (Math.abs(value) >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (Math.abs(value) >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (Math.abs(value) >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

// Helper function to format metric values based on metric type
function formatMetricValue(value, metricId) {
  if (value === null || value === undefined) return 'N/A';

  // Format based on metric type
  if (METRIC_TYPES.currency.includes(metricId)) {
    return formatCurrency(value);
  } else if (METRIC_TYPES.percentage.includes(metricId)) {
    return `${value.toFixed(2)}%`;
  } else if (METRIC_TYPES.ratio.includes(metricId)) {
    return value.toFixed(2);
  } else if (METRIC_TYPES.eps.includes(metricId)) {
    return value.toFixed(3);
  }
  
  // Default formatting
  return value.toFixed(2);
}
