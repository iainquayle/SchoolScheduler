const express = require('express');
const router = express.Router();
const db = require('./sql-db'); 
const {validateInput, validateInputSpaced, validateEmailPattern} = require('./validation');
const { validateUser } = require("./validation");

const NULL_ID = -1;

router.post('/add_class', (req, res) => {
  const { token, body } = req.body;
  if (!validateUser(token) || !validateInput([body.SchoolID, body.FacultyCode, body.CourseCode ])) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `INSERT INTO UserClasses (UserID, ClassID) VALUES (? ,(SELECT ClassID FROM Classes WHERE SchoolID = ? AND FacultyCode = ? AND CourseCode = ?))`,
      [token.UserID, body.SchoolID, body.FacultyCode, 1],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error adding class:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Class added');
        res.json({ classid: insertResult.insertId });
    });
  }
});

router.post('/todos', (req, res) => {
  const { token } = req.body;
  if (!validateUser(token)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `SELECT * FROM UserTodos WHERE UserID = ?`,
      [token.UserID],
      (err, result) => {
        if (err) {
          console.error('Error retrieving todos:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Todos retrieved: ' + result.length);

        res.json({todos: result});
      });
  }
});

router.post('/add_todo', (req, res) => {
  const { token, body } = req.body;
  if (!validateUser(token) || !validateInput(body.TodoName) || !validateInput(body.TodoDueDate || !validateInput(body.TodoDescription))) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `INSERT INTO UserTodos (UserID, TodoName, TodoDueDate, TodoDescription) 
        VALUES (?, ?, ?, ?)`,
      [token.UserID, body.TodoName, body.TodoDueDate, body.TodoDescription],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error adding todo:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Todo added');
        res.json({ todoid: insertResult.insertId });
    });
  }
});

router.post('/delete_todo', (req, res) => {
  const { token, body } = req.body;
  if (!validateUser(token) || !validateInput(body.TodoID)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `DELETE FROM UserTodos WHERE TodoID = ? AND UserID = ?`,
      [body.TodoID, token.UserID],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error deleting todo:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Todo deleted');
        res.json({ message: 'Todo deleted' });
    });
  }
});

router.post('/toggle_todo', (req, res) => {
  const { token, body } = req.body;
  if (!validateUser(token) || !validateInput(body.TodoID)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `UPDATE UserTodos SET TodoCompleted = NOT TodoCompleted WHERE TodoID = ? AND UserID = ?`,
      [body.TodoID , token.UserID],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error toggling todo:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Todo toggled');
        res.json({ message: 'Todo toggled' });
    });
  }
});

router.post('/login', (req, res) => {
  console.log("login called")
  const { UserHandle, Password } = req.body;
  if ((!UserHandle || !Password) || !validateInput(Password) || !(validateInput(UserHandle) || validateEmailPattern(UserHandle))) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
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
  }
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
  } else {
    followSchool(token.UserID, body.SchoolName);
    res.json({ message: "Success" });
  }
});

router.post('/register', (req, res) => {
  console.log("register called")
  const { Username, Password, Email, SchoolName } = req.body;

  if ((!Username || !Password || !Email) || !validateInput([Username, Password]) || !validateEmailPattern(Email) || !validateInputSpaced(SchoolName)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `INSERT INTO Users (Username, Password, Email, SchoolID) 
      VALUES (?, ?, ?, NULL)`,
      [Username, Password, Email],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error registering user:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        } else {
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
        }
        console.log('User registered successfully');
    });
  }
});

module.exports = router;
