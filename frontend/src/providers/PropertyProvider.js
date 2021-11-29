import axios from "axios";
import { useReducer, useEffect, createContext } from "react";
import reducer, {
  SET_PROPERTY_DATA,
  SET_PROPERTY_ID,
  SET_FAV,
  SET_LOGGED_USER,

} from '../reducer/Property';

export const propertyContext = createContext();



export default function PropertyProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    propertyId: 0,
    properties: [],
    fav:[],
    loggedUser: {},
    hasRead: []
  });

console.log("state", state);
  const setPropertyId = id => dispatch({ type: SET_PROPERTY_ID, id});
  const setLoggedInUser = (user) => {
    if (!user) {
      axios.post(`/api/users/logout`)
      .then(res => console.log(res));
    }
    dispatch({type : SET_LOGGED_USER, user});
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/properties'),
      axios.get('/api/properties/favorites/all'),
      axios.get('/api/users/getUser'),
      axios.get('/api/users/notifications')
      // get has_read = false   ==> '/api/users/notifications/unread'
    ])
    .then(
      ([{ data: properties }, { data: fav }, {data:loggedUser}, {data: hasRead}]) =>
        dispatch({
          type: SET_PROPERTY_DATA,
          properties,
          fav,
          loggedUser,
          hasRead
        })
      )
    .catch(e => console.log(e));
  }, []);




  const addToYourFav = (user_id, property_id) => {
    return axios.post(`/api/properties/favorites/new`, {property_id,user_id})
      .then(res => {
        const fav = res.data;
        const id = fav.id;
        dispatch({type:SET_FAV, id, fav});
      })
  }

  const removeFromFav = (user_id, property_id) => {
    return axios.delete(`/api/properties/favorites/${property_id}`, {data : {data : user_id}})
      .then(res => {
        const fav = res.data;
        const id = fav.id;
        dispatch({type:SET_FAV, id, fav});
      })
  }

  const data = {state, setPropertyId, addToYourFav, removeFromFav, setLoggedInUser};

  return (
    <propertyContext.Provider value={data}>
      { props.children }
    </propertyContext.Provider>
  )
}