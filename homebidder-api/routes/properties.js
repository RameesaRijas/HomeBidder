const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties,
  addProperty,
  getPropertiesPhotos,
  getRegisteredUsersAndBids,
  getPropertyDetailsById,
  getAllFavorites,
  addToFavorites,
  removeFromFavorites
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

      //to get fav
  router.get("/favorites/all", (req, res) => {
    getAllFavorites()
      .then(result => res.json(result))
      .catch(error => res.json(error));
  })
  
  ///get bidder registrations and bids
  router.get('/bidder', (req, res) => {
    getRegisteredUsersAndBids()
      .then((bidders) => res.json(bidders))
      .catch((err) => res.json({
          error: err.message
      }));
  });

  //get all the details by passing id
  router.get('/:id', (req, res) => {
    const id = req.params.id
    getPropertyDetailsById(id)
      .then(property => {
        return new Promise(resolve => {
            getPropertiesPhotos(id)
              .then(images =>  {
                if (images) { 
                  property['thumbnail'] = images;
                }
                resolve(property)
              })
            })
            .then(result => res.json(result))
        })
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

  //add ad remove from fav
  router.post('/favorites/new', (req, res) => {
    const user_id = req.body.user_id;
    const property_id = req.body.property_id;
    addToFavorites(user_id, property_id)
      .then(result => res.json(result))
      .catch(error => res.json(error))
  })

  router.delete('/favorites/:property_id', (req, res) => {
    const user_id = req.body.data;
    const property_id = req.params.property_id;
    removeFromFavorites(user_id, property_id)
      .then(result => res.json(result))
      .catch(error => res.json(error))
  })



  return router;
};
