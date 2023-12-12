const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 
const {validateSafeInput, validateEmailPattern} = require('./validation');

const NULL_ID = -1;

router.post('/login', (req, res) => {
  console.log("login called")
  const { UserHandle, Password } = req.body;
  if ((!UserHandle || !Password) || !validateSafeInput(Password) || !(validateSafeInput(UserHandle) || validateEmailPattern(UserHandle))) {
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

router.post('/register', (req, res) => {
  console.log("register called")
  const { Username, Password, Email } = req.body;

  if ((!Username || !Password || !Email) || !validateSafeInput([Username, Password]) || !validateEmailPattern(Email)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `INSERT INTO Users (Username, Password, Email) 
    VALUES (?, ?, ?)`,
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
    }
  );
});

module.exports = router;
