const mysql = require('mysql');

//TODO: make an init function that will create tables if they need creating, and the database namespace if needed
//NOTE: currently the db will be drop upon a server restart

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'CPSC471',
  port: process.env.DB_PORT || '3306',
});

function configure(db) {
  const queries = [
    'CREATE DATABASE IF NOT EXISTS Scheduler',
    'USE Scheduler',

    `CREATE TABLE IF NOT EXISTS Users (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(45) NOT NULL UNIQUE,
      Password VARCHAR(45) NOT NULL,
      Email VARCHAR(45) NOT NULL UNIQUE,
      Admin TINYINT(1) NOT NULL DEFAULT 0,
      PRIMARY KEY (UserID))`,

    `CREATE TABLE IF NOT EXISTS Schools (
      SchoolID INT NOT NULL AUTO_INCREMENT,
      SchoolName VARCHAR(45) NOT NULL UNIQUE,
      PRIMARY KEY (SchoolID))`,

    `CREATE TABLE IF NOT EXISTS Courses (
      CourseID INT NOT NULL AUTO_INCREMENT,
      CourseName VARCHAR(45) NOT NULL,
      CourseCode VARCHAR(45) NOT NULL,
      PRIMARY KEY (CourseID))`,
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

function drop(db) {
  db.query('DROP DATABASE IF EXISTS Scheduler', (err, result) => {
    if (err) {
      console.error('Error dropping database:', err);
    } else {
      console.log('Database dropped');
    }
  });
}

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

drop(db);
configure(db);

module.exports = db;
