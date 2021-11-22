import axios from "axios";
import { useReducer, useEffect } from "react";
import reducer, {
  SET_PROPERTY_DATA,
  SET_PROPERTY_ID
} from '../reducer/Property'
const usePropertyData = () => {

  const [state, dispatch] = useReducer(reducer, {
    propertyId: 0,
    properties: [],
  });

  const setPropertyId = id => dispatch({ type: SET_PROPERTY_ID, id});

  useEffect(() => {
    Promise.all([
      axios.get('/api/properties'),
    ])
    .then(
      ([{ data: properties }]) =>
        dispatch({
          type: SET_PROPERTY_DATA,
          properties,
        })
      )
    .catch(e => console.log(e));
  }, []);


  return {state, setPropertyId}
}

export default usePropertyData;