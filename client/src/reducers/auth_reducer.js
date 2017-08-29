import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ADMIN_MESSAGE,
  SET_ADMIN_PRIVILEGES,
  FETCH_USER
} from '../actions/types';



/************************************************************

                 AUTH REDUCER FOR MANAGEING DATA

*************************************************************/

export default function(state = { authenticated: false, admin_privileges: false }, action) {

  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true , admin_privileges: false};
      break;
    case UNAUTH_USER:
      return { ...state, authenticated: false, admin_privileges: false };
        break;
    case AUTH_ERROR:
      return { ...state, error: action.payload };
        break;
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
        break;
    case FETCH_ADMIN_MESSAGE:
      return { ...state, message: action.payload };
        break;
    case SET_ADMIN_PRIVILEGES:
      return { ...state, admin_privileges: true };
      break;
    case FETCH_USER:
      return { ...state, users : action.payload };
      break;
  }
  

  return state;

}
