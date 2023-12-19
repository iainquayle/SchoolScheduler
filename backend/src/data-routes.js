const express = require('express');
const router = express.Router();
const db = require('./sql-db');

const {validateInput, validateInputSpaced, validateUser } = require('./validation');



//techincally should be searchable
router.post('/classes', (req, res) => {
  const { token, body } = req.body;
  if (!validateUser(token)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    db.query(
      `SELECT * FROM Classes`,
      //[body.SchoolID, body.FacultyCode + '%', body.CourseCode + '%', body.CourseName + '%'],
      (err, result) => {
        if (err) {
          console.error('Error searching classes:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Classes retrieved: ' + result.length);
        res.json({classes: result});
      });
  }
});

router.post('/schools', (req, res) => {
  const {token, body} = req.body;
  if (!validateUser(token)) {
    return res.status(400).json({ error: 'Invalid input data' });
  } else {
    if (body.SchoolID === -1) {
      db.query(
        `SELECT * FROM Schools`,
        (err, result) => {
          if (err) {
            console.error('Error getting schools:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json({schools: result});
      });
    } else {
      db.query(
        `SELECT * FROM Schools WHERE SchoolID = ?`,
        [body.SchoolID],
        (err, result) => {
          if (err) {
            console.error('Error getting schools:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json({schools: result});
      });
    }
  }
});

router.post('/courses', (req, res) => {
});

router.post('/assessments', (req, res) => {
});

//may want to move this to user-routes even though it is a data route
//maybe have user data specific routes, as a bunch will still be needed
router.post('/user_slots', (req, res) => {
});

module.exports = router;
