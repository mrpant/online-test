import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import Login from './container/auth/login';
import NotFound from './container/error/notfound';
import Userdashboard from './container/auth/userdashboard';
import Addquestion from './container/question/addquestion';
import Result from './container/question/result';
import Test from './container/question/test';
import Viewquestion from './container/question/viewquestion';
import Admindashboard from './container/auth/admindashboard';
import Register from './container/auth/register';
import Exam from './container/auth/exam';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { SET_ADMIN_PRIVILEGES } from './actions/types';
import jwt_decode from 'jwt-decode';
import RequireAuth from './container/auth/require_auth';
import RequireAdmin from './container/auth/require_admin';


//create  middileware for storing all reducers data into store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token'); // token
var userRole = null;
// update application state with token information if needed
if (token) {
  // update authentication flag
  store.dispatch({ type: AUTH_USER });

  // update admin privileges if needed
  const  decoded_token = jwt_decode(token);
    userRole = decoded_token.role;

  if (decoded_token.role == 'admin') {
    store.dispatch({ type: SET_ADMIN_PRIVILEGES });
  }
  
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
       <IndexRoute component={ userRole == "admin" ? Admindashboard : (userRole == "user") ? RequireAuth(Test) : Login } />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="admindashboard" component={RequireAdmin(Admindashboard)} />
        <Route path="addquestion" component={RequireAdmin(Addquestion)} />
        <Route path="viewquestion" component={RequireAdmin(Viewquestion)} />
        <Route path="exam" component={RequireAuth(Exam)} />
        <Route path="result" component={Result} />
         <Route path="test" component={RequireAuth(Test)} />
        <Route path="*" component={NotFound} />
       </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
