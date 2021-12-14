const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

//  Variables
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

//  Enable CORS & JSON
const options = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
  exposedHeaders: 'auth-token',
};
app.use(cors(options));
app.use(express.json());

// Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);

//  Connect to mongodb
mongoose.connect(URI, () => console.log('Connected to database!'));

//  Connect to server
app.listen(PORT, () => console.log('Server running at port: ', PORT));
