import { SET_SECTION, SET_STUDENT_TYPE, SET_STUDENT_DATA, SET_EVALUATION_RESULTS } from './actions';

const initialState = {
  section: 'Introducción',
  studentType: null,
  studentData: {
    nombre: '',
    apellido: '',
    carnet: '',
    saga: '',
    carrera: '',
  },
  evaluationResults: {}
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };
    case SET_STUDENT_TYPE:
      return { ...state, studentType: action.payload };
    case 'SET_STUDENT_DATA':
      return {
        ...state,
        studentData: {
          ...state.studentData,
          ...action.payload,
        },
      };
    case SET_EVALUATION_RESULTS:
      return { ...state, evaluationResults: action.payload };
    default:
      return state;
  }
};

export default formReducer;
