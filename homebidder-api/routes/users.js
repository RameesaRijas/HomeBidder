const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser

}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
    .then((users) => res.json(users))
    .catch((err) => res.json({
        error: err.message
    }));
  });
//register
  router.post('/register', (req,res) => {
    const {
      first_name,
      last_name,
      email,
      password
    } = req.body;

    getUserByEmail(email)
      .then(user => {
          if (user) {
              res.json({
                  msg: 'Sorry, a user account with this email already exists'
              });
          } else {
              const passwordHashed = bcrypt.hashSync(password, salt);
              return addUser(first_name, last_name, email, passwordHashed)
          }

      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));
  })

  //login to check and compare password
  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    getUserByEmail(email)
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            res.json({
              msg: 'Wrong Credentials'
            });
          }
        }
      })
      .then(user => res.json(user))
      .catch(err => res.json({
        error: err.message
      }));
  })



  return router;
}
