// when edit button is clicked, state is set to payload (the course id)

const currentCourseReducer = (currentCourse = null, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return currentCourse;
  }
};

export default currentCourseReducer;
