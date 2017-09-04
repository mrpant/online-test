import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';
import { browserHistory } from 'react-router';

class Test extends Component{
			

			constructor(props){
				super(props);
			  	window.localStorage.removeItem('examQuestion');
         	    window.localStorage.removeItem('pager');
         	    window.localStorage.removeItem('isReview');
         	     window.localStorage.removeItem('QuestionData');
         	    
         	   
			}

		
			


			
					 render(){


						return (
							<div className="inner_content_w3_agile_info two_in" >
							<br/><h2 className="w3_inner_tittle">Welcome to Online Test Demo Application on React and Redux JS</h2>
							<div className="blank-page agile_info_shadow">
							<br/><br/>
							<br/><br/>
								<center><a href="/exam" className="test_start btn btn-primary" >Click Here For Start Test</a></center>			
							</div>
							</div>
							 
		  			 );
			}
		

		}



export default connect(null, actions)(Test);	

	