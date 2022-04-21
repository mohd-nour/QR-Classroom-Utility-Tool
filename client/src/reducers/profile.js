  
const profileReducer = (profile = {}, action) => {
    switch (action.type) {
      case "GET_PROFILE":
        return action.payload;
      case "SET_PROFILE":
        return action.payload;
      case "CLEAR_PROFILE":
        return {};
      default:
        return profile;
    }
};
  
  export default profileReducer;
  