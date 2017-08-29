import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Register extends Component{
		

	 handleFormSubmit(formProps) { //SUBMIT FORM HANDLER
		 this.props.signupUser(formProps);
	 }

			render(){

			  const { handleSubmit, fields: { name , username, password } } = this.props;
					

					return(
							<div className="inner_content_w3_agile_info">
							<div className="registration admin_agile">
							<div className="signin-form profile admin">
							<h2>Registration</h2>
						    <div className="login-form">
							<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<input type="text"  placeholder="Name" required {...name} />
							<input type="text"   placeholder="Username" required   {...username}/>
							<input type="password"  placeholder="Password" required {...password} />
							<div className="tp">
							<input type="submit" value="SIGNUP" />
							</div>
							</form>
							</div>
							<h6><a href="login">Back To Login</a></h6><h6>
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
  form: 'register',
  fields: ['name', 'username', 'password']
}, mapStateToProps, actions)(Register);

