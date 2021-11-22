const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties,
  addProperties

}) => {
  /* GET properties listing. */
  router.get('/', (req, res) => {
    getProperties()
      .then((properties) => res.json(properties))
      .catch((err) => res.json({
          error: err.message
      }));
  });

  // Add a property to the listings
  router.post('/properties', (req, res) => {
    const {
      owner_id,
      number_of_bathrooms,
      number_of_bedrooms,
      parking_spaces,
      street,
      city,
      province,
      post_code,
      square_footage,
      property_type,
      year_built
    } = req.body;

    addProperties(owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
      .then(() => res.status(200))
      .catch((error) => res.status(500).send(error.message));

  })


  return router;
};
