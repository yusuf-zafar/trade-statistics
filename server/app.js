// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  const { symbol, date } = req.body;
  console.log(symbol, date);

  const { API_KEY } = process.env;
  if (!symbol || !date) {
    return res.status(400).json({ error: "Symbol and date are required." });
  }

  const formattedDate = new Date(date).toISOString().slice(0, 10);

  try {
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${formattedDate}/${formattedDate}?apiKey=${API_KEY}`
    );

    const {
      o: open,
      h: high,
      l: low,
      c: close,
      v: volume,
    } = response.data.results[0];

    console.log(response.data.results[0]);

    return res.status(200).json({ open, high, low, close, volume });
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return res
        .status(403)
        .json({
          error:
            "Insufficient permissions. Please upgrade your plan at www.polygon.io.",
        });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to fetch trade statistics." });
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
