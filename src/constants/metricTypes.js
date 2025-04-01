export const METRIC_TYPES = {
  // Currency metrics (in millions)
  currency: ['netIncome', 'freeCashFlow'],
  
  // Percentage metrics
  percentage: [
    'grossProfitMargin',
    'operatingProfitMargin',
    'netProfitMargin',
    'roe',
    'earningsYield'
  ],
  
  // Ratio metrics (2 decimal places)
  ratio: [
    'peRatio',
    'pbRatio',
    'debtToAssets',
    'operatingCashFlowSalesRatio',
    'inventoryTurnover',
    'receivablesTurnover'
  ],
  
  // EPS (3 decimal places)
  eps: ['eps']
}; 