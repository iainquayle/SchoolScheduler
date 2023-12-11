const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./user-routes'); 
const testRoutes = require('./test-routes');
//const db = require('./db'); 

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log("called");
  res.json({text: 'Hello World!'});
});

app.use('/user', userRoutes);
app.use('/test', testRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
