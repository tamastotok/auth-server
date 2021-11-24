const router = require('express').Router();
const verify = require('../middlewares/verification');
const find_user = require('../controllers/user/findUserController');
const edit_user = require('../controllers/user/editUserController');
const delete_user = require('../controllers/user/deleteUserController');

router.get('/:id', verify, find_user);
router.put('/:id', verify, edit_user);
router.delete('/:id', verify, delete_user);

module.exports = router;
