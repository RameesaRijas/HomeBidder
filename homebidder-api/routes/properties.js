const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties
}) => {
    /* GET properties listing. */
  router.get('/', (req, res) => {
    getProperties()
      .then((properties) => res.json(properties))
      .catch((err) => res.json({
          error: err.message
      }));
  });
  
  
  return router;
};
