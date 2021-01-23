const router = require('express').Router();
let User = require('../models/user.model');

// Make a HTTP GET request to '/' route
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error:' + err));
});

// Make a post request to '/add' to add a new user to DB
router.route('/add').post((req, res) => {
  // Get the username from the http body
  const username = req.body.username;

  // Create an instance of User model to create a new user
  const newUser = new User({ username });

  // Save the user to the MongoDB using the mongoose save method available on a Schema Object
  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
