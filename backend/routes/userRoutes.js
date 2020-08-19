const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/logout', userController.logout);
router.get('/logged', userController.user);
router.get('/users', auth, userController.userList);

module.exports = router;