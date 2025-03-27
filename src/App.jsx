import { useState, useEffect } from "react";
import DashboardBody from "./pages/DashboardBody";
import './styles/global.css';

const WORKER_PATH = 'https://finance-dash-worker.shanshanc-chen.workers.dev/'; 

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [inputValue, setInputValue] = useState('');
  const workerUrl = `${WORKER_PATH}?symbol=${symbol}`;

  const [chartData, setChartData] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    // Allows only letters, max 5 chars
    if (/^[A-Z]{0,5}$/.test(value)) {
      setInputValue(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Update symbol only on submit
      setSymbol(inputValue.trim());
      // Reset chart data while loading new
      setChartData(null);
    }
  };

  useEffect(() => {
    fetch(workerUrl)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log('sortedData: ', sortedData)

        setChartData({
            labels: sortedData.map((item) => item.date),
            datasets: [{
                label: "Return on Equity (ROE)",
                data: sortedData.map((item) => item.roe),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            }],
        });
      })
      .catch((error) => console.error('Fetch error:', error));
  }, [symbol, workerUrl]);

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
            <select className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm text-center w-full md:w-auto">
              <option>Annual</option>
              <option>Quarterly</option>
            </select>
            <button className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm w-full md:w-auto" type="submit">Go</button>
          </form>
        </div>
        {chartData ? (
          <DashboardBody data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
