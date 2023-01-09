import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import CoinDetails from "./page/CoinDetails";
import CoinsContainer from "./page/CoinsContainer";
import Exchanges from "./page/Exchanges";
import Home from "./page/Home";
import "./App.css";
import NftsPage from "./page/NftsPage";
import NftsDetails from "./page/NftsDetails";

function App() {
  const [errorState, setErrorState] = useState(false);
  useEffect(() => {
    const pingCoinGeckoApiFunc = async () => {
      try {
        await axios.get(`https://api.coingecko.com/api/v3/ping`);
      } catch (error) {
        console.warn(error);
        setTimeout(() => {
          setErrorState(true);
        }, 1000);
      }
    };
    pingCoinGeckoApiFunc();
  }, [errorState]);
  return (
    <>
      <Router>
        <Navbar />{" "}
        {errorState ? (
          <Error
            title={`Warning : "You've exceeded the Daily API Limit, please try again later"`}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins" element={<CoinsContainer />} />
            <Route path="/coins/:coinId" element={<CoinDetails />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/nfts" element={<NftsPage />} />
            <Route path="/nfts/:nftsId" element={<NftsDetails />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
