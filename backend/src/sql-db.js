const mysql = require('mysql');

//TODO: make an init function that will create tables if they need creating, and the database namespace if needed
//maybe also make a clear function too for testing

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CPSC471',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});



module.exports = db;
