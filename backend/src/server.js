// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

// Start the server on a specified port (e.g., 3001)
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
