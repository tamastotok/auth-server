const User = require('../../models/User');

module.exports = async function find_user(req, res) {
  try {
    const userData = await User.findById(req.params.id);
    res.send(userData);
  } catch (error) {
    res.status(400).send(error);
  }
};
