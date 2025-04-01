import { useState, useContext } from "react";
import { DashboardContext } from "./context/DashboardContext";
import DashboardBody from "./pages/DashboardBody";
import './styles/global.css';

function App() {
  const { symbol, setSymbol, period, setPeriod } = useContext(DashboardContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    // Allows only letters, max 5 chars
    if (/^[A-Z]{0,5}$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSymbol(inputValue.trim());
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value.toLowerCase());
  };

  return (
    <div>
      <h1 className="text-primary py-8 text-4xl font-bold">Financial Dashboard Mockup</h1>
      <div className="container w-full my-0 mx-auto rounded-lg mb-7 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <div className="dashboard-header flex flex-col md:flex-row justify-between items-center rounded-lg px-6 py-4 bg-primary text-white gap-4">
          <h2 className="text-2xl font-bold">Financial Dashboard</h2>
          <form className="dashboard-controls flex flex-col md:flex-row gap-4 w-full md:w-auto" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="stock-filter bg-white text-black px-4 py-2 rounded-md text-sm w-full md:w-auto" 
              name="stock-filter" 
              placeholder="Enter stock symbol..." 
              value={inputValue}
              onChange={handleInputChange}
            />
            <select 
              className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm text-center w-full md:w-auto"
              value={period}
              onChange={handlePeriodChange}
            >
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <button className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm w-full md:w-auto" type="submit">Go</button>
          </form>
        </div>
        <DashboardBody />
      </div>
    </div>
  );
}

export default App;
