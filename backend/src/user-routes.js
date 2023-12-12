const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 
const {validateInput, validateInputSpaced, validateEmailPattern} = require('./validation');
const { validateUser } = require("./validation");

const NULL_ID = -1;

router.post('/login', (req, res) => {
  console.log("login called")
  const { UserHandle, Password } = req.body;
  if ((!UserHandle || !Password) || !validateInput(Password) || !(validateInput(UserHandle) || validateEmailPattern(UserHandle))) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  let loginQuery = '';
  if (UserHandle.includes('@')) {
    loginQuery = 'SELECT UserID, Admin FROM Users WHERE Email = ? AND Password = ?';
  } else {
    loginQuery = 'SELECT UserID, Admin FROM Users WHERE Username = ? AND Password = ?';
  }

  db.query(loginQuery, [UserHandle, Password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.length > 0) {
      console.log('Login successful');
      res.json(result[0]);
    } else {
      console.log('Invalid credentials');
      res.json({ UserID: NULL_ID });
    }
  });
});


function followSchool(UserID, SchoolName) {
  let schoolID = NULL_ID;
  console.log('SchoolName: ', SchoolName);
  db.query(
    `SELECT SchoolID FROM Schools WHERE LOWER(SchoolName) = LOWER(?)`,
    [SchoolName],
    (err, result) => {
    if (err) {
      console.error('Error during login:', err);
    }
    if (result.length > 0) {
      console.log('School ID retrieved successfully');
      schoolID = result[0].SchoolID;
      db.query(
        `UPDATE Users SET SchoolID = ? WHERE UserID = ?`,
        [schoolID, UserID],
        (err, result) => {
          if (err) {
            console.error('Error during login:', err);
          }
          console.log('User updated successfully');
      });
    } else {
        console.log('School not found');
    }
  });
}

router.post('/follow_school', (req, res) => {
  console.log("follow called")
  const { token, body } = req.body;
  if (!validateUser(token) || !validateInputSpaced(body.SchoolName)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }
  followSchool(token.UserID, body.SchoolName);
  res.json({ message: "Success" });
});

router.post('/register', (req, res) => {
  console.log("register called")
  const { Username, Password, Email, SchoolName } = req.body;

  if ((!Username || !Password || !Email) || !validateInput([Username, Password]) || !validateEmailPattern(Email) || !validateInputSpaced(SchoolName)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `INSERT INTO Users (Username, Password, Email, SchoolID) 
    VALUES (?, ?, ?, NULL)`,
    [Username, Password, Email],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('User registered successfully');
  });
  db.query(
    `SELECT UserID, Admin FROM Users WHERE Username = ?`,
    [Username],
    (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('User ID retrieved successfully');
      res.json(result[0]);
      if (SchoolName !== '') {
        followSchool(result[0].UserID, SchoolName);
      }
  });
});

module.exports = router;
