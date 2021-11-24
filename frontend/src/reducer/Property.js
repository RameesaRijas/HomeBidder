export const SET_PROPERTY_DATA = "SET_PROPERTY_DATA";
export const SET_PROPERTY_ID = "SET_PROPERTY_ID";
export const SET_FAV = "SET_FAV";


function reducer(state, action) {
  switch (action.type) {
    case SET_PROPERTY_DATA:
      return {  
        ...state,
        properties: action.properties,
        fav: action.fav,
      }

      case SET_PROPERTY_ID:
      return {
        ...state,
        propertyId: action.id,
      }

      case SET_FAV:
        let idAlreadyExists = state.fav.some((el)=> el.id === action.id )
        let favCopy = [...state.fav];
        if (idAlreadyExists) {
          favCopy = favCopy.filter(item => item.id !== action.id);
         } else {
          favCopy = [...favCopy, action.fav]
         }
        return {
          ...state,
          fav: favCopy
        }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;