const User = require('../../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Register validation
const validateRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(6).max(64).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

// Register new user
module.exports = async function register_user(req, res) {
  // Validate data
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in the databaase
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email is already exists!');

  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send('Name is already exists!');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Make a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.send({ message: 'User signed up successfully!', status: true });
  } catch (error) {
    res.status(400).send(error);
  }
};
