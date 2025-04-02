import { useState, createContext } from "react";
import { useFinancialData } from "../hooks/useFinancialData";

const DEFAULT_SYMBOL = import.meta.env.VITE_DEFAULT_SYMBOL;
const DEFAULT_PERIOD = import.meta.env.VITE_DEFAULT_PERIOD;

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
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