const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = async function delete_user(req, res) {
  const user = await User.findById(req.header('_id'));

  // Check the password is correct
  const validPassword = await bcrypt.compare(
    req.header('password'),
    user.password
  );

  if (!validPassword) return res.status(400).send('Invalid password!');

  await User.deleteOne({ _id: req.header('_id') });

  res.status(200).send('User removed!');
};
