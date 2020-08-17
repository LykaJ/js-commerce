const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user', userController.user);
router.get('/users', userController.userList);

module.exports = router;