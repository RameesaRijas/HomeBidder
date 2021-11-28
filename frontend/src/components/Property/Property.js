import { useParams,Link  } from "react-router-dom";
import { Carousel, Col, Card, Alert, Button } from "react-bootstrap";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";
import Confirm from "./ConfirmModal";
import { toast } from "react-toastify";
import PropertyDetails from "./PropertyDetails";
import PropertyHistory from "./PropertyHistory";
import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';
import PropertyBid from "./PropertyBid";
import useBidsData from "../../hooks/useBidsData";


export default function Property() {

  const { addToYourFav, removeFromFav, state:contextState} = useContext(propertyContext);
  const params = useParams();
  const {
    state,
    formatter,
    userRegisterationForBid, 
    userSetBid,
    addBidTohistory
  } = useBidsData(params.propertyId);

  const user = contextState.loggedUser;
  const userType = user && user.user_type;
  const Userid = user && user.id
  const fav = contextState.fav

  const isfav = ()=> {
    const result =fav.filter((fav)=> {
      return fav.user_id === Userid && String(fav.property_id) === params.propertyId 
    }).length
    return result
  }


  const isRegistredUser = state.bidders.filter(item => (item.user_id === Userid && state.properties.bid_id === item.bids_id) ? item : "");

  const today = new Date();
  const startDay = new Date(state.properties.bid_start_date);
  const endDay = new Date(state.properties.bid_end_date);
  const diffStart = startDay.getTime() - today.getTime();
  const diffEnd = endDay.getTime() - today.getTime();

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
    addToYourFav(Userid, params.propertyId)
      .then(toast.success("Property added to Fav"))
      .catch((error) => console.log(error));
  };

  const remove = () => {
    removeFromFav(Userid, params.propertyId)
      .then(toast.success("Property Removed From Fav"))
      .catch((error) => console.log(error));
  };

  const addAndRemoveFav = () => {
    if (!Userid) {
      return null;
    } else {
      return fav && isfav() ? (
        <div className="favlist" onClick={remove}>
          <i className="fa fa-heart" style={{ color: "red" }}></i>
        </div>
      ) : (
        <div className="favlist" onClick={save}>
          <i className="fa fa-heart" style={{ color: "black" }}></i>
        </div>
      );
    }
  };

    
  return (
    <Col className="sm-12">
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
                <Card.Body className="bid-info">
                  <p  className="bid-button">
                    {(userType === 2 ? 
                    ((diffStart > 0 || diffStart <= 0) && diffEnd > 0) ?
                        (state.properties.owner_id === Userid || isRegistredUser.length) ?

                        <Button  className ="btn btn-dark" >
                              {((diffStart <= 0 ) && diffEnd > 0) ? 
                                  "Bid Started"
                                : 
                               (((diffStart > 0 ) && diffEnd > 0) ?
                                  "Bid Not Yet Started" : "Bid Closed")
                              }
                              
                          </Button>
                        : ((Userid && state.properties.owner_id !== Userid)? 
                            <Confirm bidId={state.properties.bid_id} register={userRegisterationForBid} state={state}></Confirm> :
                              <Alert variant="warning"> Please Login/ Register to see bid Details</Alert>) 
                      :
                        <Alert variant="warning"> Bid Is closed</Alert>
                    : "")}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="text-center text-md-left  d-flex justify-content-between">
            <div className="text-center text-md-left"> 
            <h2>
               {state.properties.street} </h2>
            <h6>
              {state.properties.city},{state.properties.province},
            {state.properties.post_code}
          </h6></div>  
              {addAndRemoveFav()}
         </div>
         </div>
          <div>
            <div className="d-flex justify-content-left">
              <div className=" text-md-left w-100">
                <div className="text-center text-md-right  d-flex justify-content-between">
                  <div>
                    <span>
                    <i className="fa fa-bed"> </i>
                      <p>Beds: <b>{state.properties.number_of_bedrooms}</b> </p>
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
                  <p>
                    <hr></hr>
                  </p>
                </div>
                    <div>
                      <PropertyDetails></PropertyDetails>
                      </div>
                      {((state.properties.owner_id === Userid || isRegistredUser.length ||userType === 1) && ((diffStart <= 0 ) && diffEnd > 0)) && 
                        <PropertyBid 
                        userSetBid={userSetBid}
                        state={state}
                        user_id ={Userid}
                        userType={userType}
                        endDay={endDay}
                        addBidTohistory = {addBidTohistory}/>
                      }
                 <div>
                  <PropertyHistory user={Userid}></PropertyHistory>
                   </div>
                </div>
              </div>
            </div>
          </div>
    </Col>
  );
}
