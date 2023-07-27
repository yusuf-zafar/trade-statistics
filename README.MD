# Stock Data Retrieval App

This is a simple web application that allows users to retrieve historical stock data for a particular day using the Polygon API.

## Features Implemented

- **Frontend (React)**:
  - User interface for entering the stock symbol and date for data retrieval.
  - Data validation for the stock symbol to accept alphabets only using regex.
  - Utilized `useState` hook to manage form inputs and trade data.
  - Disabled the "Fetch Trade Data" button and displayed "Loading..." when data is being fetched using `isLoading` state.
  - Implemented React Hot Toast to display error messages in a user-friendly way.
  - Displayed trade statistics (open, high, low, close, volume) if data is available.

- **Backend (Express)**:
  - Implemented validation for the stock symbol and date inputs, returning an error if missing.
  - Formatted the date as required by the Polygon API.
  - Handled API requests to the Polygon API using Axios.
  - Extracted required data (open, high, low, close, volume) from the Polygon API response.
  - Handled API errors and provided appropriate error messages based on the response status.

## Installation and Setup

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in both the root directory and the `client` directory.
3. Create a `.env` file in the root directory and add your Polygon API key as `API_KEY`.
4. Run the frontend and backend servers using `npm start` and `nodemon` respectively.

## How to Use

1. Enter a valid stock symbol (alphabets only) and a date for which you want to retrieve trade statistics.
2. Click the "Fetch Trade Data" button to initiate the data retrieval process.
3. If successful, the trade statistics will be displayed below the form.
4. If there is an error during data retrieval, an appropriate error message will be shown using React Hot Toast.


# Optional tasks :-

**To improve the UX for thousands of users we can make several enhancements:**

a. Pagination: If the product allows users to retrieve large datasets, implement pagination to display data in manageable chunks and avoid overwhelming the user with too much information at once.

b. User Authentication and Personalization: Implement user authentication to allow users to save their preferences, favorite stocks, or view their history of data requests. 

c. Data Visualization: Provide interactive charts and graphs to visualize the retrieved stock.

d. Mobile Responsiveness: Ensure the application is responsive and optimized for mobile devices, as many users may access it through smartphones or tablets.

e. Search Suggestions: Implement auto-complete or search suggestions to assist users in entering accurate stock symbols.

**New features to increase utility for the end user:**

a. Historical Data Range: Allow users to select a range of dates for historical stock data retrieval, instead of just a single day.

b. Compare Stocks: Enable users to compare the performance of multiple stocks side by side, facilitating better analysis and decision-making.

c. Export Data: Allow users to export historical stock data in various formats (e.g., CSV, Excel) for further analysis.