const User = require('../../models/User');

module.exports = async function edit_user(req, res) {
  const update = {
    name: req.body.name && req.body.name,
    email: req.body.email && req.body.email,
    password: req.body.password && req.body.password,
    bio: req.body.bio && req.body.bio,
    phone: req.body.phone && req.body.phone,
  };

  const options = {
    new: true,
  };
  try {
    const edit = await User.findByIdAndUpdate(req.user._id, update, options);
    res.send(edit);
  } catch (error) {
    res.status(400).send(error);
  }
};
