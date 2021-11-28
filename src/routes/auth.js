const router = require('express').Router();
const verify = require('../middlewares/verification');
const login_user = require('../controllers/auth/loginController');
const logout_user = require('../controllers/auth/logoutController');
const register_user = require('../controllers/auth/registerController');

router.post('/register', register_user);
router.post('/login', login_user);
router.get('/logout/:id', verify, logout_user);

module.exports = router;
