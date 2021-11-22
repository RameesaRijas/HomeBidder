const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties,
  addProperty,
  getPropertiesPhotos,
  getRegisteredUsers
}) => {
  /* GET properties listing. */
  router.get('/', (req, res) => {
    getProperties()
      .then(properties => {
        const getData = async () => {
          return Promise.all(properties.map(property => (
            getPropertiesPhotos(property.property_id)
              .then(images =>  {
                return {...property ,'thumbnail':images}
            })
          )))
        }  
        getData().then(data => {
          res.json(data)
        })
      })
      .catch((err) => res.json({
          error: err.message
      }));
  });
  
  //get all the registred bidders
  router.get('/bidders', (req, res) => {
    getRegisteredUsers()
      .then((bidders) => res.json(bidders))
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

    addProperty(owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
      .then((property) => res.json(property))
      .catch((error) => res.status(500).send(error.message));

  })


  return router;
};
