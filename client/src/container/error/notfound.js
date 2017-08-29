import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class NotFound extends Component{


 				render(){
		
						return(
							<div className="pages_agile_info_w3l ">
							<div className="over_lay_agile_pages_w3ls error">
							<div className="registration error">
							<h2>404</h2>
								<h3>Oops! Page Not Found.</h3>
								<h6><a href="/">Back To Home</a></h6><h6>
								</h6></div>
							</div>
							</div>
						);

					}
	}


export default NotFound;