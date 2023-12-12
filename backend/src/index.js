const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./user-routes'); 
const testRoutes = require('./test-routes');
const adminRoutes = require('./admin-routes');
//const dataRoutes = require('./data-routes');

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

app.post('/', (_, res) => {
  console.log("called");
  res.json({text: 'Hey Mom!'});
});

app.use('/user', userRoutes);
app.use('/test', testRoutes);
app.use('/admin', adminRoutes);
//app.use('/data', dataRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
