const router = require('express').Router();
const login_user = require('../controllers/auth/loginController');
const register_user = require('../controllers/auth/registerController');

router.post('/register', register_user);
router.post('/login', login_user);

module.exports = router;
