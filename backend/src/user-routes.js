const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 

//TODO:
//  login/register should return a user id if successful, wont be using a token becuase lazy and timing them out is a pain
//  register should be default to non-admin
//  

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Get a specific user by ID
router.get('/userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM Users WHERE UserID = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new user (registration)
router.post('/register', (req, res) => {
  const { Username, Password, FirstName, LastName, email, IsAdmin } = req.body;
  db.query(
    'INSERT INTO Users (Username, Password, FirstName, LastName, email, IsAdmin) VALUES (?, ?, ?, ?, ?, ?)',
    [Username, Password, FirstName, LastName, email, IsAdmin],
    (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'User created successfully' });
      }
    }
  );
});

// Update a user by ID
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { FirstName, LastName, email, IsAdmin } = req.body;
  db.query(
    'UPDATE Users SET FirstName = ?, LastName = ?, email = ?, IsAdmin = ? WHERE UserID = ?',
    [FirstName, LastName, email, IsAdmin, userId],
    (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

// Delete a user by ID
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('DELETE FROM Users WHERE UserID = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

module.exports = router;
