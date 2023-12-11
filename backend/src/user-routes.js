const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 

//TODO:
//  login/register should return a user id if successful, wont be using a token becuase lazy and timing them out is a pain
//  register should be default to non-admin
//  


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Perform database query to verify login credentials
  const loginQuery = 'SELECT * FROM Users WHERE Username = ? AND Password = ?';

  db.query(loginQuery, [username, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length > 0) {
      console.log('Login successful');
      res.json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  // Validate input data
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Perform database query to insert user
  const insertUserQuery = `
    INSERT INTO Users (Username, Password, Email) 
    VALUES (?, ?, ?)
  `;

  db.query(
    insertUserQuery,
    [username, password, email],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('User registered successfully');
      res.json({ message: 'User registered successfully' });
    }
  );
});

module.exports = router;
