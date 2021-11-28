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
  removeFromFavorites,
  addBidSession,
  addPropertyImage,
  getAllPending,
  updateApproved
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

  // Get all the pending listings for Admin
  router.get('/admin/pending', (req, res) => {
    getAllPending()
      .then(result => res.json(result))
      .catch(error => res.json(error));
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
  router.post('/new', (req, res) => {
    const owner_id = req.session.userId

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
      year_built,
      base_price_in_cents,
      bid_start_date,
      bid_end_date
    } = req.body;

    addProperty(owner_id, number_of_bathrooms, number_of_bedrooms, parking_spaces, street, city, province, post_code, square_footage, property_type, year_built)
      .then((property) => {
        addBidSession(property.id, base_price_in_cents, bid_start_date, bid_end_date)
        .then((response) => res.json(response))
      })
      .catch((error) => res.status(500).send(error.message));
  });

// Update the is_approved status of a pending listing
  router.patch('/admin/pending', (req, res) => {
    const data = req.body.data;
    const property_id = data.property_id;
    const isApproved = data.is_approved;

    console.log('property_id ==> ', property_id);
    console.log('req.body ==> ', data)

    updateApproved(property_id)
      .then(result => res.json(result))
      .catch(error => res.json(error));
  });

 //add post bid
 router.post('/bidder',(req,res)=> {
    const{
      bidder_registration_id,
      amount
    } = req.body
  addbidlog(bidder_registration_id,amount).then((bid) => res.json(bid))
  .catch((error) => res.status(500).send(error.message));
 });
  //add ad remove from fav
  //add and remove from fav
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
