const express = require('express');
const app = express();
const userRoutes = require('./userRoutes'); // Adjust the path accordingly
const db = require('./db'); // Adjust the path accordingly

app.use(express.json());

// Use the userRoutes for requests starting with /users
app.use('/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
