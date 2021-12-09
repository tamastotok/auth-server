const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = async function change_password(req, res) {
  const user = await User.findById(req.header('_id'));
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  //  Compare new passwords
  if (newPassword !== confirmNewPassword)
    return res.status(400).send('New passwords does not match!');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Check the password is correct
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!validPassword) return res.status(400).send('Invalid password!');

  await User.findByIdAndUpdate(req.header('_id'), {
    password: hashedPassword,
  });

  res.send('Password changed!');
};
