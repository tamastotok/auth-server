const User = require('../../models/User');
const Joi = require('joi');

module.exports = async function edit_user(req, res) {
  const update = {
    name: req.body.name && req.body.name,
    email: req.body.email && req.body.email,
    bio: req.body.bio && req.body.bio,
    phone: req.body.phone && req.body.phone,
  };

  const options = {
    new: true,
  };

  // Register validation
  const validateRegistration = (data) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().min(6).max(64).email(),
      bio: Joi.string().empty(''),
      //phone: Joi.string().min(6).pattern(new RegExp('^[+] [0-9]$|[0-9]')),
      phone: Joi.string().min(6).pattern(new RegExp('[0-9]')),
    });

    return schema.validate(data);
  };

  // Validate data
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findByIdAndUpdate(req.header('_id'), update, options);
  res.send('User info updated!');
};
