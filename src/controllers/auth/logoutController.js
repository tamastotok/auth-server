const User = require('../../models/User');

module.exports = async function find_user(req, res) {
  const update = {
    isOnline: false,
  };

  const options = {
    new: true,
  };

  const user = await User.findByIdAndUpdate(req.header('_id'), update, options);

  res.send(user);
};
