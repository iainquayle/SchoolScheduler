const express = require('express');
const app = express();
const userRoutes = require('./user-routes'); 
const testRoutes = require('./test-routes');
//const db = require('./db'); 

app.use(express.json());

app.get('/', (req, res) => {
  console.log("called");
  res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use('/test', testRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
