import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import aaplData from "@/data/aapl.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const sortedData = [...aaplData].sort((a, b) => new Date(a.date) - new Date(b.date));

  const [chartData] = useState({
    labels: sortedData.map((item) => item.date),
    datasets: [
      {
        label: "Return on Equity (ROE)",
        data: aaplData.map((item) => item.roe), // Scale to billions
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    scales: { y: { title: { display: true, text: "ROE" } } },
    plugins: { title: { display: true, text: "AAPL Key Metrics" } },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default App;
