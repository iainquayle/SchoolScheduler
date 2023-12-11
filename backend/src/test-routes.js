const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log("test login")
  console.log(req.params)
  res.json({userid: 1});
});

module.exports = router;
