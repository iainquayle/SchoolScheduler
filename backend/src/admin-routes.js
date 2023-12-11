const express = require('express');
const router = express.Router();
const db = require('./sql-db');

const {validateSafeInput, validateCredentials} = require('./validation');


router.post('/add_school', (req, res) => {
});

router.post('/add_course', (req, res) => {
});

router.post('/add_admin', (req, res) => {
});

module.exports = router;
