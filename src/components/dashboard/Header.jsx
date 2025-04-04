import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import AVAILABLE_SYMBOLS from '../../data/symbolListUS';
import Dropdown from '../Dropdown';
import './Header.css';

const Header = ({ market }) => {
  const { symbol, setSymbol, period, setPeriod } = useContext(DashboardContext);
  const [inputValue, setInputValue] = useState('');
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  const symbolListRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();

    // Allows only letters and dash, max 10 chars
    if (/^[A-Z-]{0,10}$/.test(value)) {
      setInputValue(value);
      debounceFilter(value);
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

  const handleListItemClick = (e) => {
    const symbolTxt = e.target.textContent;
    setInputValue(symbolTxt);
    setIsListExpanded(false);
  };

  const debounceFilter = useCallback((value) => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      console.log('Filtering with debounce for: ', value);
      setFilteredSymbols(AVAILABLE_SYMBOLS
        .filter(symbol => symbol.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 8));
    }, 300); // 300ms debounce delay - adjust as needed
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // close list if click is outside of input and dropdown list
      const isOutsideInput = inputRef.current && !inputRef.current.contains(e.target);
      const isOutsideList = symbolListRef.current && !symbolListRef.current.contains(e.target);
      
      if (isOutsideInput && isOutsideList && isListExpanded) {
        setIsListExpanded(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isListExpanded) {
        setIsListExpanded(false);
      } else if (!isListExpanded) {
        setIsListExpanded(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [isListExpanded]);

  return (
      <div className="header">
          <div className="dashboard-header flex flex-col md:flex-row justify-between items-center rounded-lg px-6 py-4 bg-primary text-white gap-4">
          <h2 className="text-2xl font-bold">{`${symbol} - `}{market === 'TW' ? 'TW' : 'US'} Stock Market</h2>
          <form className="dashboard-controls flex flex-col md:flex-row gap-4 w-full md:w-auto" onSubmit={handleSubmit}>
            <div className={`filter-container ${isListExpanded ? 'isListOpen' : ''}`}>
              <input 
                ref={inputRef}
                type="text" 
                className="stock-filter bg-white text-black px-4 py-2 focus:rounded-b-none rounded-md text-sm w-full" 
                name="stock-filter" 
                placeholder="Enter stock symbol..." 
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsListExpanded(true)}
                autoComplete="off"
              />
              <ul 
                className="symbol-list"
                ref={symbolListRef}
                onClick={handleListItemClick}
              >
                {filteredSymbols.map((symbol, index) => (<li key={index} className="symbol-item">{symbol}</li>))}
              </ul>
            </div>
            <Dropdown
              options={market === 'TW' ? ['Annual', 'Quarterly', 'Monthly'] : ['Annual']}
              value={period}
              onChange={handlePeriodChange}
            />
            <button className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm w-full md:w-auto" type="submit">Go</button>´
          </form>
        </div>
      </div>
  );
};

export default Header;