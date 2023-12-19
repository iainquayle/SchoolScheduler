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
  const tableCreationQueries = [
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

    `CREATE TABLE IF NOT EXISTS Classes (
      ClassID INT NOT NULL AUTO_INCREMENT,
      SchoolID INT NOT NULL,      
      FacultyCode VARCHAR(45) NOT NULL,
      CourseCode INT NOT NULL,
      ClassName VARCHAR(45) NOT NULL,
      ClassTime VARCHAR(45) NOT NULL,
      ClassDays VARCHAR(45) NOT NULL,
      ClassLocation VARCHAR(255) NOT NULL,
      ClassDescription VARCHAR(255) NOT NULL,
      PRIMARY KEY (ClassID),
      FOREIGN KEY (SchoolID) REFERENCES Schools(SchoolID))`,

    `CREATE TABLE IF NOT EXISTS Assessments (
      AssessmentID INT NOT NULL AUTO_INCREMENT,
      AssessmentName VARCHAR(45) NOT NULL,
      AssessmentWeight INT NOT NULL,
      AssessmentDueDate DATE NOT NULL,
      PRIMARY KEY (AssessmentID))`,
    
    `CREATE TABLE IF NOT EXISTS UserAssessments (
      UserID INT NOT NULL,
      AssessmentID INT NOT NULL,
      PRIMARY KEY (UserID, AssessmentID))`,

    `CREATE TABLE IF NOT EXISTS UserClasses (
      UserID INT NOT NULL,
      ClassID INT NOT NULL,
      PRIMARY KEY (UserID, ClassID))`,
//maybe assessments and todos are simply merged, just have an optional courseID and gradeweight
    `CREATE TABLE IF NOT EXISTS UserTodos (
      TodoID INT NOT NULL AUTO_INCREMENT,
      UserID INT NOT NULL,
      TodoName VARCHAR(45) NOT NULL,
      TodoDueDate DATE NOT NULL,
      TodoDescription VARCHAR(255) NOT NULL,
      TodoCompleted TINYINT(1) NOT NULL DEFAULT 0,
      PRIMARY KEY (TodoID))`,
  ]
  for (let i = 0; i < tableCreationQueries.length; i++) {
    db.query(tableCreationQueries[i], (err, result) => {
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
