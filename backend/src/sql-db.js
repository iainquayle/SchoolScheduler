const mysql = require('mysql');

//NOTE: currently the db will be drop and reset upon a server restart
//TODO:
//  - assessments
//  - class times
//  - class locations
//  - user assessments
//

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'CPSC471',
  port: process.env.DB_PORT || '3306',
});

function configure(db) {
  const table_creation_queries = [
    'CREATE DATABASE IF NOT EXISTS Scheduler',
    'USE Scheduler',

    `CREATE TABLE IF NOT EXISTS Users (
      UserID INT NOT NULL AUTO_INCREMENT,
      Username VARCHAR(45) NOT NULL UNIQUE,
      Password VARCHAR(45) NOT NULL,
      Email VARCHAR(45) NOT NULL UNIQUE,
      SchoolID INT,
      Admin TINYINT(1) NOT NULL DEFAULT 0,
      PRIMARY KEY (UserID))`,

    `CREATE TABLE IF NOT EXISTS Schools (
      SchoolID INT NOT NULL AUTO_INCREMENT,
      SchoolName VARCHAR(45) NOT NULL UNIQUE,
      SchoolAbbreviation VARCHAR(45) NOT NULL,
      PRIMARY KEY (SchoolID))`,

    `CREATE TABLE IF NOT EXISTS Courses (
      CourseID INT NOT NULL AUTO_INCREMENT,
      CourseName VARCHAR(45) NOT NULL,
      CourseCode VARCHAR(45) NOT NULL,
      PRIMARY KEY (CourseID))`,

    `CREATE TABLE IF NOT EXISTS Sections (
      SectionID INT NOT NULL AUTO_INCREMENT,
      SectionName VARCHAR(45) NOT NULL,
      SectionCode VARCHAR(45) NOT NULL,
      CourseID INT NOT NULL,
      PRIMARY KEY (SectionID),
      FOREIGN KEY (CourseID) REFERENCES Courses(CourseID))`,
  ]
  for (let i = 0; i < table_creation_queries.length; i++) {
    db.query(table_creation_queries[i], (err, result) => {
      if (err) {
        console.error('Error executing ' + i + ' :', err);
      } else {
        console.log('Init statment ' + i + ' executed successfully');
      }
    });
  }
  db.query(`SELECT * FROM Users WHERE Username = 'admin'`, (err, result) => {
    if (err) {
      console.error('Error checking for admin:', err);
    } else {
      if (result.length === 0) {
        db.query(`INSERT INTO Users (Username, Password, Email, SchoolID, Admin) VALUES ('admin', 'admin', 
          'admin@scheduler.com', NULL, 1)`, (err, _) => {
          if (err) {
            console.error('Error creating admin:', err);
          } else {
            console.log('Admin created');
          }
        });
      }
    }
  });
  db.query(`SELECT * FROM Schools WHERE LOWER(SchoolName) = LOWER('University of Calgary')`, (err, result) => {
    if (err) {
      console.error('Error checking for school:', err);
    } else {
      if (result.length === 0) {
        db.query(`INSERT INTO Schools (SchoolName, SchoolAbbreviation) VALUES ('University of Calgary', 'U of C')`, (err, _) => {
          if (err) {
            console.error('Error creating uofc:', err);
          } else {
            console.log('U of C created');
          }
        });
      }
    }
  });
}

function drop(db) {
  db.query('DROP DATABASE IF EXISTS Scheduler', (err, _) => {
    if (err) {
      console.error('Error clearing database:', err);
    } else {
      console.log('Database cleared');
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
