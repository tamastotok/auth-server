const User = require('../../models/User');

module.exports = async function find_user(req, res) {
  const user = await User.findById(req.header('_id'));
  user.login = false;

  res.send(user.login);
};
