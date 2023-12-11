const mysql = require('mysql');

//TODO: make an init function that will create tables if they need creating, and the database namespace if needed
//maybe also make a clear function too for testing

function initDb(db) {
  const queries = [
    'CREATE DATABASE IF NOT EXISTS `Scheduler`',
  ]
  for (let i = 0; i < queries.length; i++) {
    db.query(queries[i], (err, result) => {
      if (err) {
        console.error('Error executing ' + i + ' :', err);
      } else {
        console.log('Init statment ' + i + ' executed successfully');
      }
    });
  }
}

function clearDb(db) {
  db.query('DROP DATABASE IF EXISTS `Scheduler`', (err, result) => {
    if (err) {
      console.error('Error dropping database:', err);
    } else {
      console.log('Database dropped');
    }
  });
}

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

initDb(db);
clearDb(db);

module.exports = db;
