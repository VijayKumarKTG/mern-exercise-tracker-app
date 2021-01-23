const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Env configuration
require('dotenv').config();

// Middlewares
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB setups
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes setups
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Listening the app
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
