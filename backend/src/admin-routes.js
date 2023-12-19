const express = require('express');
const router = express.Router();
const db = require('./sql-db');
const {validateInput, validateInputSpaced, validateAdmin, ADMIN} = require('./validation');


router.post('/add_class', (req, res) => {
  const { token, body } = req.body;
  if (!validateAdmin(token) || !validateInputSpaced([body.SchoolName, body.FacultyCode, body.CourseCode, body.ClassTime, body.ClassDays, body.ClassLocation, body.ClassDescription])) {
    console.log('Invalid input data');
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `INSERT INTO Classes (SchoolID, FacultyCode, CourseCode, ClassTime, ClassDays, ClassLocation, ClassDescription) 
        VALUES (
        (SELECT SchoolID FROM Schools WHERE SchoolName = ?),
        UPPER(?), ?, ?, ?, ?, ?)`,
      [body.SchoolName, body.FacultyCode, body.CourseCode, body.ClassTime, body.ClassDays, body.ClassLocation, body.ClassDescription],
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

router.post('/add_school', (req, res) => {
  const { token, body } = req.body;
  if (!validateAdmin(token) || !validateInput(body.SchoolName)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `INSERT INTO Schools (SchoolName, SchoolAbbreviation) 
        VALUES (?, ?)`,
      [body.SchoolName, body.SchoolAbbreviation],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error adding school:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('School added');
        res.json({ schoolid: insertResult.insertId });
    });
  }
});

router.post('/promote_user', (req, res) => {
  const {token, body} = req.body;
  if (!validateAdmin(token) || !validateInput(body.Username)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `UPDATE Users SET Admin = 1 WHERE Username = ?`,
    [body.Username],
    (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error promoting admin:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('Admin promoted');
      res.json({ message: 'Admin promoted' });
    });
});

router.post('/equate_assessments', (req, res) => {
});

//dangerous, may limit certain actions if implemented
router.post('/push_query', (req, res) => {
});

module.exports = router;
