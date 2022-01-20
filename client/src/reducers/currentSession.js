import {
    SET_SESSION_DATA,
    CLEAR_SESSION_DATA,
  } from "../constants/actionTypes";
  
  // reducers change state
  
  const reducer = (currentSession = null, action) => {
    switch (action.type) {
      case SET_SESSION_DATA:
        return action.payload;
      case CLEAR_SESSION_DATA:
        return null;
      default:
        return currentSession;
    }
  };
  
  export default reducer;
  