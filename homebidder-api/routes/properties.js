const express = require('express');
const router = express.Router();

module.exports = ({
  getProperties,
  addProperty,
  getPropertiesPhotos,
  getRegisteredUsersAndBids,
  getPropertyDetailsById
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

 //add post bid 
 router.post('/bidder',(req,res)=> {
    const{
      bidder_registration_id,
      amount
    } = req.body
  addbidlog(bidder_registration_id,amount).then((bid) => res.json(bid))
  .catch((error) => res.status(500).send(error.message));
 });

 router.post('/userRegisteration',(req,res)=>{
   const{bids_id,
    user_id}
    =req.body
   adduserRegistration(bids_id,user_id).then((register) => res.json(register))
   .catch((error) => res.status(500).send(error.message));
    });


  return router;
};
