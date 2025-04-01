import { useState, createContext } from "react";
import { useFinancialData } from "../hooks/useFinancialData";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [symbol, setSymbol] = useState('AAPL');
  const [period, setPeriod] = useState('annual');
  const { metrics, isLoading, error } = useFinancialData(symbol, period);

  const value = {
    symbol,
    setSymbol,
    period,
    setPeriod,
    metrics,
    isLoading,
    error
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};