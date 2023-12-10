const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_database_user',
  password: process.env.DB_PASSWORD || 'your_database_password',
  database: process.env.DB_NAME || 'SchoolScheduler',
});

// Check database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

app.post('/login', (req, res) => {
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

app.post('/register', (req, res) => {
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

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
