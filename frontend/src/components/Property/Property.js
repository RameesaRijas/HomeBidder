import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Property() {
  const params = useParams();
  const [state, setState] = useState({
    properties: {},
    bidders: {},
    bids: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/properties/${params.propertyId}`),
      axios.get(`/api/properties/bidder`)
    ]).then(([{ data: properties }, {data: bidders}]) =>{
        setState({
          ...state,
          properties:properties,
          bidders:bidders,
        })
      })
      .catch(error => console.log(error));
  }, [])
  console.log(state);
  return (
   <> 
    <h2>Property{state.properties.street}
    </h2>
   </>
  );
}