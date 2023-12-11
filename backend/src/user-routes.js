const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 
const {validateSafeInput, validateEmailPattern} = require('./validation');

const NULL_ID = -1;

//TODO:
//  login/register should return a user id if successful, wont be using a token becuase lazy and timing them out is a pain
//  register should be default to non-admin
//  


router.post('/login', (req, res) => {
  console.log("login called")
  const { userHandle, password } = req.body;
  // TODO: expand validation here as well as in register
  if ((!userHandle || !password) || !validateSafeInput(password) || !(validateSafeInput(userHandle) || validateEmailPattern(userHandle))) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  let loginQuery = '';
  if (userHandle.includes('@')) {
    loginQuery = 'SELECT UserID, Admin FROM Users WHERE Email = ? AND Password = ?';
  } else {
    loginQuery = 'SELECT UserID, Admin FROM Users WHERE Username = ? AND Password = ?';
  }

  db.query(loginQuery, [userHandle, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.length > 0) {
      console.log('Login successful');
      res.json({ userid: result[0].UserID, admin: result[0].Admin});
    } else {
      console.log('Invalid credentials');
      res.json({ userid: NULL_ID });
    }
  });
});

router.post('/register', (req, res) => {
  console.log("register called")
  const { username, password, email } = req.body;

  if ((!username || !password || !email) || !validateSafeInput([username, password]) || !validateEmailPattern(email)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `INSERT INTO Users (Username, Password, Email) 
    VALUES (?, ?, ?)`,
    [username, password, email],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('User registered successfully');
  });
  db.query(
    `SELECT UserID, Admin FROM Users WHERE Username = ?`,
    [username],
    (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('User ID retrieved successfully');
      res.json({ userid: result[0].UserID, admin: result[0].Admin});
    }
  );
});

module.exports = router;
