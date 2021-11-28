import io from 'socket.io-client';
import axios from "axios";
import { useEffect, useReducer, useRef } from "react";
import reducer, {
  SET_BIDDER,
  SET_BIDS,
  SET_BIDS_DATA
} from '../reducer/Bid'

let socketRef;
const CONNECTION_PORT = 'localhost:3001'

const useBidsData = (propertyId) => {

  socketRef = useRef(io(CONNECTION_PORT, { transports: ['websocket', 'polling', 'flashsocket'] }));
  const [state, dispatch] = useReducer(reducer, {
    properties: {},
    bidders: [],
    bids: [],
    users: [],
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/properties/${propertyId}`),
      axios.get(`/api/properties/bidder/${propertyId}`),
      axios.get(`/api/users/bids/${propertyId}`),
      axios.get('/api/users/')
    ])
      .then(([{ data: properties }, { data: bidders }, {data : bids}, {data : users}]) => {
        console.log("data", properties);
        dispatch({
          type:SET_BIDS_DATA,
          properties,
          bidders,
          bids,
          users
        });
      })
      .catch((error) => console.log(error));
  }, []);

   

  useEffect(() => {
    const socket = socketRef.current
    socket.on('bid', function(data) {
      const dataParsed = JSON.parse(data);
      console.log(dataParsed);
      if (dataParsed.type === SET_BIDS && typeof dataParsed === "object") {
        dispatch(dataParsed);
      }
    })

    socket.on('bidders', function(data) {
      const dataParsed = JSON.parse(data);
      console.log(dataParsed);
      if (dataParsed.type === SET_BIDDER && typeof dataParsed === "object") {
        dispatch(dataParsed);
      }
    })

    return (() => socket.disconnect());

  }, [dispatch])

console.log(state);

  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const userRegisterationForBid = (bidId) => {
    return axios.post(`/api/users/bidder`, {bidId})
      .then(result =>  {
        const data = result.data;
        dispatch({type: SET_BIDDER, bidder:data })
      })
  }


  const userSetBid = (data) => {
    return axios.post('/api/users/bid', {data})
      .then(result => {
        dispatch({
          type: SET_BIDS,
          bids: result.data
        })
      })
  }

  const addBidTohistory = (amount, userId, owner_id, property_id) => {
    const data = {
      amount, 
      userId,
      owner_id,
      property_id
    }
    return axios.post('/api/properties/bids/history',  { data })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  
  

  return {state, formatter, userRegisterationForBid , userSetBid, addBidTohistory}
}

export default useBidsData;