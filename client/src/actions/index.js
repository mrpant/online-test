import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ADMIN_MESSAGE,
  SET_ADMIN_PRIVILEGES,
  FETCH_USER,
  GET_QUESTION,
  GET_EXAM
} from './types';
import Notifications, {notify} from 'react-notify-toast';




const jwt_decode = require('jwt-decode'); //JWT CODE FOR PROTECT API TOKEN
const ROOT_URL = 'http://localhost:3090';  // CONFIGURED API END PONT URL
let successColor = { background: 'green', text: "#FFFFFF" }; // COLOR PROPERTY TO TOASTR
let failerColor =  { background: 'red', text: "#FFFFFF" };  // COLOR PROPERTY TO TOASTR



export function signinUser({ username, password }) { //ACTION FOR LOGIN
  return function(dispatch) {
    // Submit username/password to the server
    axios.post(`${ROOT_URL}/signin`, { username, password })
      .then(response => {

           if(response.data.status == false){
              notify.show(response.data.msg, "custom", 3000, failerColor); 
              return false;
           }
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // decode token for info on the user
        let decoded_token_data = jwt_decode(response.data.token);
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the appropriate route
        if(decoded_token_data.role == 'user') {
          notify.show('Thank You!! You are Successfully Logged In as USER!!', "custom", 3000, successColor);
          browserHistory.push('/test');
        }
        // - set admin flag if token indicates the user has admin privileges
        else if(decoded_token_data.role == 'admin') {
          dispatch({ type: SET_ADMIN_PRIVILEGES });
           notify.show('Thank You!! You are Successfully Logged In as ADMIN!!', "custom", 3000, successColor);
          browserHistory.push('/admindashboard');
        }
        else {
           notify.show('Invalid Request Found!! Please Try Again!!', "custom", 3000, failerColor);
          browserHistory.push('/');
        }
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
         notify.show('Invalid User!!, You Need to Registration First...', "custom", 3000, failerColor);
        dispatch(authError('Bad Login Info'));

      });
  }
}

export function signupUser({ name, username, password }) { // ACTION FRO REGISTER

  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { name, username , password })
      .then(response => {
        dispatch({ type: UNAUTH_USER });
        notify.show("Thank You!! You Are Successfully Registered...", "custom", 3000, successColor);
        browserHistory.push('/login');
      }).catch(response =>{
       notify.show("Sorry!! Somthing is Missing...", "custom", 3000, failerColor); 
       dispatch(authError(response.data.error))

       });
  }
}


export function authError(error) { //ACTION FOR AUTH MESSAGE
  return {
    type: AUTH_ERROR,
    payload: error
  };
}


export function signoutUser() { //ACTION FOR LOGOUT
  localStorage.removeItem('token');
  notify.show("By-Bye!! Now Logged out this Application", "custom", 3000, successColor);
  browserHistory.push('/');
  setTimeout(function(){
  window.location.reload();
  },100);
  return { type: UNAUTH_USER };
}


export function getUserList() { // ACTION FOR LISTING USER
  return function(dispatch) {
    axios.get(`${ROOT_URL}/userlist`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_USER ,
          payload: response.data
        });
      });
  }
}


//ACTION FOR ADD NEW QUESTION AND ITS OPTIONS TOO
export function addQuestion({ question , option_one,option_one_isAnswer,option_two, option_two_isAnswer,option_three,option_three_isAnswer,option_four,option_four_isAnswer }) {

  return function(dispatch) {

    axios.post(`${ROOT_URL}/addquestion`,{ question , option_one,option_one_isAnswer,option_two, option_two_isAnswer,option_three,option_three_isAnswer,option_four,option_four_isAnswer })
      .then(response => {
        console.log("res"+JSON.stringify(response));
        notify.show("Thank You!! Question Added Successfully", "custom", 3000, successColor);
        browserHistory.push('/viewquestion');
      }).catch(response =>{
        notify.show("Sorry!! Somthing is Missing...", "custom", 3000, failerColor); 
     
       });
  }
}



// GET ALL QUESTION LIST
export function getQuestionList() {

  return function(dispatch) {

    axios.get(`${ROOT_URL}/questionlist`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        
        dispatch({
          type: GET_QUESTION ,
          payload: response.data
        });
      });
  }
}


export function getExamList() { // GET EXAM QUESTION LIST

  return function(dispatch) {

    axios.get(`${ROOT_URL}/examlist`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
         
        dispatch({
          type: GET_EXAM ,
          payload: response.data
        });
      });
  }
}



export function updateStatus( _id ) { // UPDATE USER IN-ACTIVE STATUS
  console.log(_id);
  return function(dispatch) {
    axios.post(`${ROOT_URL}/updatestatus`,{ _id})
      .then(response => {
        console.log("resUUUUU"+JSON.stringify(response));
        notify.show("Thank You!! Status Updated Successfully", "custom", 3000, successColor);
        browserHistory.push('/admindashboard');
         setTimeout(function(){
           window.location.reload();
         },100);
      }).catch(response =>{
        notify.show("Sorry!! Somthing is Missing...", "custom", 3000, failerColor); 
     
       });
  }
}
