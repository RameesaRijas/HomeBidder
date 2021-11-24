const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties,
  addProperty

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
  router.post('/new', (req, res) => {
    console.log('Hello from the backend!')

    const owner_id = 2;

    const {
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

    addProperty(owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
      .then((property) => res.json(property))
      .catch((error) => res.status(500).send(error.message));

  })


  return router;
};
