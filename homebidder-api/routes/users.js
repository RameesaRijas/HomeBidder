const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");



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
    console.log(req.body)
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
              console.log("pass",passwordHashed)
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

            console.log("password match")
            const token = jwt.sign({
              email : req.body.email,},"secret123")

            res.json({auth:true,token:token,user:user})
          } else {
            res.json({ auth :false,

              msg: 'Wrong Credentials'
            });
          }
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  })
  const verfiyjwt = (req,res,next)=> {
    const token = req.headers['x-access-token']
    if(!token){
      res.send("you need a token")
    } else {
      jwt.verify(token,"secret123",(err,token)=>{
        if(err){
          res.json({auth:false,message:"you are not authenticated"})
        } else {
          req.email = token.email
          next()
        }
    })
    }
};

router.get('/userAuth',verfiyjwt,(req,res) => {
  res.send("you are  authenticated")
})
  return router;
}
