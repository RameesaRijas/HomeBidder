import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Col, Image, Table, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Property.css";
import "font-awesome/css/font-awesome.min.css";
import Confirm from "./ConfirmModal";
import { toast } from "react-toastify";
export default function Property(props) {
  const { properties, fav, addToFav, removeFav } = props;

  const params = useParams();
  const [state, setState] = useState({
    properties: {},
    bidders: {},
    bids: {},
  });
  console.log("bids", state.bidders);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/properties/${params.propertyId}`),
      axios.get(`/api/properties/bidder`),
    ])
      .then(([{ data: properties }, { data: bidders }]) => {
        console.log("data", properties);
        setState({
          ...state,
          properties: properties,
          bidders: bidders,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const imgUrl =
    state.properties.thumbnail &&
    state.properties.thumbnail.map((item) => (
      <Carousel.Item>
        <img
          className="carousel-image"
          src={item.image_url}
          alt="First slide"
        />
      </Carousel.Item>
    ));

  const save = () => {
    addToFav(2, params.propertyId)
      .then(toast.success("Property added to Fav"))
      .catch((error) => console.log(error));
  };

  const remove = () => {
    removeFav(2, params.propertyId)
      .then(toast.success("Property Removed From Fav"))
      .catch((error) => console.log(error));
  };
  return (
    <Col sm-12>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8"></div>
          <div className="d-flex justify-content-center">
            <div className="col-sm-12">
 
              <Link to={{ pathname: `/` }}>
                <Carousel interval={null}>{imgUrl}</Carousel>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-sm-12">
              <Card>
                <Card.Body>
                  <Button variant="primary">
                    <Confirm></Confirm>{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="container-fluid">
          <div className="text-center text-md-left  d-flex justify-content-between">
            <div> <p className="text-center text-md-left">
            {state.properties.street} </p>
            <p>
              {state.properties.city},{state.properties.province}
            {state.properties.post_code}
          </p></div>
          {fav && fav.includes(state.properties.id) ? (
                <div className="favlist" onClick={remove}>
                  <i className="fa fa-heart" style={{ color: "black" }}></i>
                </div>
              ) : (
                <div className="favlist" onClick={save}>
                  <i className="fa fa-heart" style={{ color: "red" }}></i>
                </div>
              )}
          
         </div>
         </div>
          <div>
            <div className="d-flex justify-content-left">
              <div className=" text-md-left w-100">
                <div className="text-center text-md-right  d-flex justify-content-between">
                  <div>
              
                    <span>
                    <i className="fa fa-bed"> </i>
                      <p>beds: {state.properties.number_of_bedrooms} </p>
                    </span>
                  </div>
                  <div>
                     
                    <p>
                    <i className="fa fa-bath"> </i> 
                      <p> Bath: {state.properties.number_of_bedrooms}</p>
                    </p>
                  </div>
                  <div>
                    <div className="price">
                      <span className="text-danger">For Sale:</span>
                      <span className="text-danger">
                        {formatter.format(
                          state.properties.base_price_in_cents / 100
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-16">
                  <p><hr></hr></p>
                  </div>
                <div className="details">
                  
                <h2>Property details</h2>
                  <div>
                   
                    <span>
                      Number of BedRooms: {state.properties.number_of_bedrooms}
                    </span>
                  </div>
                  <div>
                    <p>
                     Number of Bathrooms:{state.properties.number_of_bedrooms}
                    </p>
                  </div>
                  <div>
                  <p> Number of Parking Spots: {state.properties.parking_spaces}</p>
                  </div>
                  <div>
                  <p> property_type: {state.properties.property_type}</p>
                  </div>

                  <div>
                    <p>Area: {state.properties.square_footage}Sq Ft</p>
                  </div>
                  <div>
                    <p>Year Built: {state.properties.year_built}</p>
                  </div>
                  <div><h2>Prpoerty history</h2></div>
                  <div className="container-fluid">
                  <Table>
                    <thead>
                     <tr>
                     <th scope="col">#</th>
                     <th scope="col">year</th>
                     <th scope="col">Amount Sold</th>
                     </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>2011</td>
                      <td>2,380000</td>
                    </tr>
                    <tr>
                      <th scope="row">1</th>
                      <td>2013</td>
                      <td>2,380080</td>
                    </tr>
                    </tbody>
                  </Table>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
