import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import questionReducer from './question_reducer';
const rootReducer = combineReducers({
  form,
  auth: authReducer,
  question: questionReducer
});

export default rootReducer;

/************************************************************

                CONFIGURED ALL REDUCER FOR MANAGEING DATA

*************************************************************/
