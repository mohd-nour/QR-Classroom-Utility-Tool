import { ADD_SESSION, FETCH_ALL_SESSIONS, REMOVE_SESSION  } from "../constants/actionTypes";

// reducers change state

const reducer = (sessions = [], action) => {
  switch (action.type) {
    case ADD_SESSION:
      return [...sessions, action.payload];
    case FETCH_ALL_SESSIONS:
      return action.payload;
    case REMOVE_SESSION:
      return sessions.filter((session) => session.sessionNumber !== action.payload);
    default:
      return sessions;
  }
};

export default reducer;
