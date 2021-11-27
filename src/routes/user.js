const router = require('express').Router();
const verify = require('../middlewares/verification');
const find_user = require('../controllers/user/findUserController');
const edit_user = require('../controllers/user/editUserController');
const change_password = require('../controllers/user/changePasswordController');
const delete_user = require('../controllers/user/deleteUserController');

router.get('/get/:id', verify, find_user);
router.put('/edit/:id', verify, edit_user);
router.put('/editpw/:id', verify, change_password);
router.delete('/del/:id', verify, delete_user);

module.exports = router;
