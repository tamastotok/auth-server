const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = async function delete_user(req, res) {
  try {
    const user = await User.findById(req.user._id);

    // Check the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (validPassword) {
      await User.deleteOne({ _id: req.user._id });
      return res.send('User removed!');
    } else {
      return res.status(400).send('Invalid password');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
