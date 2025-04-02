import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/dashboard/Header";
import Body from "./components/dashboard/Body";
import './styles/global.css';

const DEFAULT_MARKET = import.meta.env.VITE_DEFAULT_MARKET;

function App() {
  return (
    <Dashboard>
      <Header market={DEFAULT_MARKET} />
      <Body />
    </Dashboard>
  );
}

export default App;
