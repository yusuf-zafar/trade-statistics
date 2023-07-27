import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState("");
  const [tradeData, setTradeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
	if (!/^[A-Za-z]+$/.test(symbol)) {
		toast.error("Invalid stock symbol. Please enter alphabets only.");
		return;
	  }

	setIsLoading(true);
	
    try {
      const response = await axios.post(
        "http://localhost:5000/api/fetchStockData",
        { symbol, date }
      );
	  setIsLoading(false);
      setTradeData(response.data);
    } catch (error) {
      toast.error(error.response.data.error);
	  setIsLoading(false);
      console.log(error.response.data.error);
      console.error("Error fetching data from server:", error);
      setTradeData(null);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <h1 className="title">Trade Statistics</h1>
      <p className="subtitle">View Historical Trade Data of Any Stock</p>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Stock :
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="form-input"
            placeholder="Enter stock symbol"
            required
            maxLength={5}
          />
        </label>
        <label className="form-label">
          Date :
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
            required
          />
        </label>
        <button type="submit" className="form-submit" disabled={isLoading}>
           {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
      <hr />
      {tradeData ? (
        tradeData && (
          <div className="trade-data">
            <h2 className="trade-data-title">
              Trade Statistics for {symbol} on {date}
            </h2>
            <p className="trade-data-item">Open: {tradeData.open}</p>
            <p className="trade-data-item">High: {tradeData.high}</p>
            <p className="trade-data-item">Low: {tradeData.low}</p>
            <p className="trade-data-item">Close: {tradeData.close}</p>
            <p className="trade-data-item">Volume: {tradeData.volume}</p>
          </div>
        )
      ) : (
        <h2 className="trade-data-title">No results to show</h2>
      )}
    </div>
  );
}

export default App;
