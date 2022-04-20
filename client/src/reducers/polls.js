  
const reducer = (polls = [], action) => {
    switch (action.type) {
      case "ADD_POLL":
        return [...polls, action.payload];
      case "FETCH_ALL_POLLS":
        return action.payload;
      default:
        return polls;
    }
};
  
  export default reducer;
  