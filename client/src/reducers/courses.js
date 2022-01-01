const reducer = (courses = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...courses, action.payload];
    default:
      return courses;
  }
};

export default reducer;
