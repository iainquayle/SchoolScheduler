const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  console.log(req.params)
  console.log("called")
  res.json({userid: 1});
});

module.exports = router;
