import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinDetails from "./page/CoinDetails";
import CoinsContainer from "./page/CoinsContainer";
import Exchanges from "./page/Exchanges";
import Home from "./page/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<CoinsContainer />} />
          <Route path="/coins/:coinId" element={<CoinDetails />} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
