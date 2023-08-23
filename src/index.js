import "./App.css";
import Charts from "./components/Charts/Charts";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Elements/Header";
import MostActiveCard from "./components/Elements/MostActiveCard";
import Sidebar from "./components/Elements/Sidebar";
// import KeyInfo from './SymbolPage/KeyInfo';
// import StockPage from './SymbolPage/StockPage';

function App() {
  return (
    <div className="App">
      <div className="main">
        <header>
          <Header />
        </header>
        <div className="sideBarStockChartsHolder">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="stockCharts">
            <Dashboard />
            <Charts />
            <MostActiveCard />
            {/* <KeyInfo />
          <StockPage /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
