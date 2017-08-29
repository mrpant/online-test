import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Login extends Component{

			 handleFormSubmit({ username, password }) {  //SUBMIT FORM HANDLER
			    this.props.signinUser({ username, password });
			 }



				render(){

					  const { handleSubmit, fields: { username, password } } = this.props;
						

						return(
							<div className="inner_content_w3_agile_info">
							<div className="registration admin_agile">
							<div className="signin-form profile admin">
							<h2>User Login</h2>
						    <div className="login-form">
							<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
							<input type="text"  placeholder="Username" required  {...username} />
							<input type="password"  placeholder="Password" required {...password} />
							<div className="tp">
							<input type="submit" value="LOGIN" />
							</div>
							</form>
							</div>
							<div className="login-social-grids admin_w3">
							<ul>
							<li><a href="javascript:void(0);alert('Coming Soon');"><i className="fa fa-facebook"></i></a></li>
							<li><a href="javascript:void(0);alert('Coming Soon');"><i className="fa fa-twitter"></i></a></li>
							<li><a href="javascript:void(0);alert('Coming Soon');"><i className="fa fa-rss"></i></a></li>
							</ul>
							</div>
							<h6><a href="register">Click Here to Register</a></h6><h6>
							</h6>
							</div>
							</div>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							</div>

							);

					}
	}



function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}



export default reduxForm({ //REDUX FORM HANDLER
  form: 'login',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Login);
