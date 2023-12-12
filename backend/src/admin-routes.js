const express = require('express');
const router = express.Router();
const db = require('./sql-db');
const {validateSafeInput, validateAdmin, ADMIN} = require('./validation');


router.post('/add_school', (req, res) => {
  const { userid, password, schoolname, schoolabbreviation } = req.body;
  if (!validateAdmin(userid, password) || !validateSafeInput(schoolname)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `INSERT INTO Schools (SchoolName) 
      VALUES (?)`,
    [schoolname],
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

router.post('/promote_admin', (req, res) => {
  const { userid, password, username } = req.body;
  if (!validateAdmin(userid, password) || !validateSafeInput(targetid)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `UPDATE Users SET Admin = 1 WHERE Username = ?`,
    [username],
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
