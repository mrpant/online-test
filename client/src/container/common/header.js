import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

class Header extends Component{



		constructor(props) { // CONSTRUCOR FOR INIT VARIABLE
			super(props);
			this.logout = this.logout.bind(this);
		} 


		logout(){ // LOGOUT USER
			 this.props.signoutUser();
		}



		 render(){

		 	var authListingFirst = null;
		 	var authListingSecond = null;
		 	var authListingThird = null;



		  	if(this.props.authenticated == true){ // PERMISSION FOR USER AND ADMIN

			authListingFirst  = <li className="second admin-pic">
				       			<ul className="top_dp_agile">
									<li className="dropdown profile_details_drop">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
											<div className="profile_img">	
												<span className="prfil-img"><img src="assets/images/admin.jpg" alt="" /> </span> 
											</div>	
										</a>
										<ul className="dropdown-menu drp-mnu">
											<li> <a href="javascript:void(0);alert('Comming Soon');"><i className="fa fa-cog"></i> Settings</a> </li> 
											<li> <a href="javascript:void(0);alert('Comming Soon');"><i className="fa fa-user"></i> Profile</a> </li> 
											<li> <a href="javascript:void(0)" onClick={this.logout}><i className="fa fa-sign-out"></i> Logout</a> </li>
										</ul>
									</li>
								</ul>
								</li>	


			if(this.props.admin_privileges == true){  //PERMISSION FOR ADMIN ONLY


				authListingSecond = <li className="second top_bell_nav">
								    <ul className="top_dp_agile ">
									<li className="dropdown head-dpdn">
										<a href="admindashboard" className="dropdown-toggle" ><i className="fa fa-user" aria-hidden="true"></i> </a>
									</li>	
									</ul>
									</li>	



			      authListingThird	=  <li className="second top_bell_nav">
								   		<ul className="top_dp_agile ">
										<li className="dropdown head-dpdn">
											<a href="addquestion" className="dropdown-toggle" ><i className="fa fa-question-circle" aria-hidden="true"></i></a>
										</li>				
										</ul>
										</li>

				}	// END IF FOR ADMIN


			} //END IF FOR ADMIN AND USER BOTH
					
			

							return (
									
								<div className="w3_agileits_top_nav">
								<ul id="gn-menu" className="gn-menu-main">
				               	<li className="second logo admin"><h1 ><a href="/"><i className="fa fa-graduation-cap" aria-hidden="true"></i>Online Test</a></h1></li>
								{authListingFirst}
								{authListingSecond}
								{authListingThird}
								<li className="second w3l_search admin_login">
								<form >
								<input type="search" name="search" placeholder="Search here..." required="" />
								<button className="btn btn-default"  type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
								</form>
								</li>			
								<li className="second full-screen">
							    <section className="full-top">
								<button id="toggle" ><i className="fa fa-arrows-alt" aria-hidden="true"></i></button>	
								</section>
								</li>
								</ul>
								</div>  
								);


							}
				}



		function mapStateToProps(state){ //STORE DATA INTO KEY VARIABLE

			return{

				authenticated:state.auth.authenticated ,admin_privileges: state.auth.admin_privileges 
			};

		}

export default connect(mapStateToProps, actions)(Header);


