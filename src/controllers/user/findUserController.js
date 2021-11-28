const User = require('../../models/User');

module.exports = async function find_user(req, res) {
  const userData = await User.findById(req.header('_id'));
  if (!userData) return res.status(400).send('User is not found!');

  res.send(userData);
};
