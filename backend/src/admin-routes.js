const express = require('express');
const router = express.Router();
const db = require('./sql-db');
const {validateSafeInput, validateAdmin, ADMIN} = require('./validation');


router.post('/add_school', (req, res) => {
  const { token, body } = req.body;
  if (!validateAdmin(token) || !validateSafeInput(body.SchoolName)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

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
});

router.post('/add_course', (req, res) => {
});

router.post('/promote_user', (req, res) => {
  const {token, body} = req.body;
  if (!validateAdmin(token) || !validateSafeInput(body.Username)) {
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
