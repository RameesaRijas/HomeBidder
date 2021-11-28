import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";


export default function PropertyDetails() {
  const params = useParams();
  const [state, setState] = useState({
    properties: {},
    bidders: {},
    bids: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/properties/${params.propertyId}`),
      axios.get(`/api/properties/bidder`),
    ])
      .then(([{ data: properties }, { data: bidders }]) => {
        setState({
          ...state,
          properties: properties,
          bidders: bidders,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const dateFormater = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", { timeZone: "America/New_York" });
  };
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div className="div-orginize">
        <div className="col-md-6">
          <div className="details">
            <h2>Property details</h2>
            <p>Number of BedRooms: {state.properties.number_of_bedrooms}</p>
            <p>Number of Bathrooms: {state.properties.number_of_bedrooms}</p>
            <p> Number of Parking Spots: {state.properties.parking_spaces}</p>
            <p> property_type: {state.properties.property_type}</p>

            <p>Area: {state.properties.square_footage}Sq Ft</p>

            <p>Year Built: {state.properties.year_built}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="bidding-div">
            <div className="bid-info">
              <button className="bidding">
                <p className="p-2 mb-2  text-light">
                  bidding price:{formatter.format(
                          state.properties.base_price_in_cents / 100
                        )} $CA
                </p>
              </button>
              <p className="p-3 mb-3 text-black">
                <h6>starting bid date:</h6>
                {dateFormater(state.properties.bid_start_date)}
              </p>
              <p className="p-3 mb-3  text-black">
                <h6>ending bid date:</h6>
                {dateFormater(state.properties.bid_end_date)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <p>
          <hr></hr>
        </p>
      </div>
     
    </div>
  );
}
