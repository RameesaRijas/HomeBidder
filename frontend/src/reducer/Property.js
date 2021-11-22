export const SET_PROPERTY_DATA = "SET_PROPERTY_DATA";
export const SET_PROPERTY_ID = "SET_PROPERTY_ID";


function reducer(state, action) {
  switch (action.type) {
    case SET_PROPERTY_DATA:
      return {  
        ...state,
        properties: action.properties,
        bidders: action.bidders
      }

      case SET_PROPERTY_ID:
      return {
        ...state,
        propertyId: action.id,
      }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;