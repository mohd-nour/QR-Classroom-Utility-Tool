import { FETCH_ALERTS, ADD_ALERT } from "../constants/actionTypes";

const alertReducer = (alerts = [], action) => {
  switch (action.type) {
    case FETCH_ALERTS:
      return action.payload;
    case ADD_ALERT:
      return [...alerts, action.payload];
    default:
      return alerts;
  }
};

export default alertReducer;
