const express = require('express');
const router = express.Router();
const db = require('./sql-db');

const {validateSafeInput, validateCredentials } = require('./validation');

router.post('/schools', (req, res) => {
});

router.post('/courses', (req, res) => {
});

router.post('/assessments', (req, res) => {
});

//may want to move this to user-routes even though it is a data route
//maybe have user data specific routes, as a bunch will still be needed
router.post('/user_slots', (req, res) => {
});

