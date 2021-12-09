const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Login validation
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(64).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

// Login user
module.exports = async function login_user(req, res) {
  const conditions = {
    email: req.body.email,
  };

  const update = {
    isOnline: true,
  };

  const options = {
    new: true,
  };

  // Validate data
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in the databaase
  const user = await User.findOneAndUpdate(conditions, update, options);
  if (!user) return res.status(400).send('Unable to login!');

  // Check the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Unable to login!');

  // JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  // Response
  res.header('auth-token', token).send({ _id: user._id, name: user.name });
};
