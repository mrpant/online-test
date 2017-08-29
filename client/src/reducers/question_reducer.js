import {
  GET_QUESTION,
  GET_EXAM
} from '../actions/types';


/************************************************************

                QUESTION REDUCER FOR MANAGEING DATA

*************************************************************/


export default function(state = { authenticated: false, admin_privileges: false }, action) {

  switch(action.type) {
    case GET_QUESTION:
      return { ...state, questionData: action.payload , authenticated: true };
      break;
    case GET_EXAM:
      return { ...state, examData: action.payload , authenticated: true };
      break;
   
  }
  
  return state;

}
