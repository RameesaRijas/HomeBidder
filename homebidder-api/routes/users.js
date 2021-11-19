const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = ({

}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send('respond with a resource');
  });
  return router;
}
