const express = require('express');
const router = express.Router();
const db = require('./sql-db');

const {validateSafeInput, validateUser } = require('./validation');

router.post('/schools', (req, res) => {
  const {userid, password} = req.body;
  if (!validateUser(userid, password)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  db.query(
    `SELECT * FROM Schools`,
    (err, result) => {
      if (err) {
        console.error('Error getting schools:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({schools: result});
    }
  );
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
