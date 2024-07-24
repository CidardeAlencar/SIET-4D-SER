export const SET_SECTION = 'SET_SECTION';
export const SET_STUDENT_TYPE = 'SET_STUDENT_TYPE';
export const SET_STUDENT_DATA = 'SET_STUDENT_DATA';
export const SET_EVALUATION_RESULTS = 'SET_EVALUATION_RESULTS';

export const setSection = (section) => ({
  type: SET_SECTION,
  payload: section
});

export const setStudentType = (studentType) => ({
  type: SET_STUDENT_TYPE,
  payload: studentType
});

export const setStudentData = (data) => ({
  type: SET_STUDENT_DATA,
  payload: data
});

export const setEvaluationResults = (results) => ({
  type: SET_EVALUATION_RESULTS,
  payload: results
});
