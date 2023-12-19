const express = require('express');
const {getUser, login, signup} = require('../controllers/userController');
const router = express.Router();


router.get('/:id', getUser);

//login route
router.post('/login', login);

//signup route
router.post('/signup', signup);


module.exports = router;