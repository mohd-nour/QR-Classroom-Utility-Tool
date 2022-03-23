import * as api from '../api';
import { FETCH_ALL, CREATE } from '../constants/actionTypes';
import swal from 'sweetalert';

export const getCourses = () => async (dispatch) => {
  try {
    const uniqueId = localStorage.getItem('currentUserUniqueId');
    const { data } = await api.fetchCourses(uniqueId);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudents = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents(id);
    dispatch({ type: 'FETCH_STUDENTS', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addStudent = (courseId, studentId) => async (dispatch) => {
  try {
    const { data } = await api.addStudent(courseId, studentId);
    dispatch({ type: 'ADD_STUDENT', payload: data });
  } catch (error) {
    swal('ID not found!', { icon: 'warning' });
  }
};

export const fetchGradeSheets = (courseId) => async (dispatch) => {
  try {
    const { data } = await api.fetchGradeSheets(courseId);
    dispatch({ type: 'FETCH_GRADE_SHEETS', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postGradeSheet =
  (courseId, deliverable, gradeSheet, navigate) => async (dispatch) => {
    try {
      console.log(gradeSheet);
      const { data } = await api.postGradeSheet(
        courseId,
        deliverable,
        gradeSheet
      );
      dispatch({ type: 'POST_GRADE_SHEET', payload: data });
      navigate('/SheetReport', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

export const updateGradeSheet =
  (updatedGradeSheet, navigate) => async (dispatch) => {
    try {
      console.log(updatedGradeSheet);
      const { data } = await api.updateGradeSheet(
        updatedGradeSheet.courseId,
        updatedGradeSheet.deliverable,
        updatedGradeSheet.students,
        updatedGradeSheet._id
      );
      navigate('/SheetReport', { replace: true });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

export const addSession = (courseId) => async (dispatch) => {
  try {
    const { data } = await api.addSession(courseId);
    dispatch({ type: 'ADD_SESSION', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeSession = (courseId, sessionNumber) => async (dispatch) => {
  try {
    await api.removeSession(courseId, sessionNumber);
    dispatch({ type: 'REMOVE_SESSION', payload: sessionNumber });
  } catch (error) {
    console.log(error);
  }
};

export const finalizeSession =
  (courseId, sessionNumber) => async (dispatch) => {
    try {
      await api.finalizeSession(courseId, sessionNumber);
      swal('Attendance taking for this session has been finalized', {
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };

export const closeSession =
  (courseId, sessionNumber, closedObj) => async (dispatch) => {
    try {
      await api.closeSession(courseId, sessionNumber, closedObj);
    } catch (error) {
      console.log(error);
    }
  };

export const addStudentToSession =
  (studentId, classId, sessionNumber) => async (dispatch) => {
    try {
      const { data } = await api.addStudentToSession(
        studentId,
        classId,
        sessionNumber
      );
      dispatch({ type: 'ADD_STUDENT_TO_SESSION', payload: data });
    } catch (error) {
      swal(
        'The ID you entered is either non-existent or has is not enrolled in your class',
        { icon: 'warning' }
      );
      console.log(error);
    }
  };

export const getStudentsFromSession =
  (classId, sessionNumber) => async (dispatch) => {
    try {
      const { data } = await api.getStudentsFromSession(classId, sessionNumber);
      dispatch({ type: 'FETCH_STUDENTS_IN_SESSION', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const setSingleSession =
  (classId, sessionNumber) => async (dispatch) => {
    try {
      const { data } = await api.getSingleSession(classId, sessionNumber);
      await dispatch({ type: 'SET_SESSION_DATA', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getSessions = (courseId) => async (dispatch) => {
  try {
    const { data } = await api.getSessions(courseId);
    dispatch({ type: 'FETCH_ALL_SESSIONS', payload: data });
  } catch (error) {
    alert('Sessions have not been fetched for the following reason: ' + error);
  }
};

export const removeStudent = (courseId, studentId) => async (dispatch) => {
  try {
    const { data } = await api.removeStudent(courseId, studentId);
    dispatch({ type: 'REMOVE_STUDENT', payload: data });
  } catch (error) {
    alert('ID not found!');
  }
};

export const createCourse = (course, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(course);
    dispatch({ type: CREATE, payload: data });
    navigate('/Home', { replace: true });
    dispatch({ type: 'CLEAR' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.deleteCourse(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (id, course, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, course);
    dispatch({ type: 'UPDATE', payload: data });
    navigate('/Home', { replace: true });
    dispatch({ type: 'CLEAR' });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentCourse = (courseData) => (dispatch) => {
  try {
    dispatch({ type: 'SET', payload: courseData });
  } catch (error) {
    console.log(error);
  }
};

export const clearCurrentCourse = () => (dispatch) => {
  dispatch({ type: 'CLEAR' });
};
