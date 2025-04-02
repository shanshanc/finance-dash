import { useState, useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Dropdown from '../Dropdown';

const Header = ({ market }) => {
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
      <div className="header">
          <div className="dashboard-header flex flex-col md:flex-row justify-between items-center rounded-lg px-6 py-4 bg-primary text-white gap-4">
          <h2 className="text-2xl font-bold">{market === 'TW' ? 'TW' : 'US'} Stock Market</h2>
          <form className="dashboard-controls flex flex-col md:flex-row gap-4 w-full md:w-auto" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="stock-filter bg-white text-black px-4 py-2 rounded-md text-sm w-full md:w-auto" 
              name="stock-filter" 
              placeholder="Enter stock symbol..." 
              value={inputValue}
              onChange={handleInputChange}
            />
            <Dropdown
              options={market === 'TW' ? ['Annual', 'Quarterly', 'Monthly'] : ['Annual', 'Quarterly']}
              value={period}
              onChange={handlePeriodChange}
            />
            <button className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm w-full md:w-auto" type="submit">Go</button>
          </form>
        </div>
      </div>
  );
};

export default Header;