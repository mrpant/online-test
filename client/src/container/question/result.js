import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';

class Result extends Component{
			

			constructor(props){
				super(props);
			   this.resultView = JSON.parse(window.localStorage.getItem('examQuestion'));
			   this.counter = 0;
			   this.resultView.map(value => {  
			   		this.counter += value.marks;
			   });
			}	

			  


	
					 render(){


					 	const _resTemp  = <div><br/><center><h1>Thanks For Attemped Online Test....</h1></center>
					 					 <br/><br/><center><h1>Scoring Marks : {this.counter} / 30</h1></center>
					 					 <br/><br/><center><a href="/">Back To Home</a></center>
					 					 </div>;   

									                
									       

					 		


						return (
							<div className="inner_content_w3_agile_info two_in" >
							<h2 className="w3_inner_tittle">TEST RESULT</h2>
							<div className="blank-page agile_info_shadow">
										{_resTemp}		
							</div>
							</div>
							 
		  			 );
				}

		}



export default connect(null, actions)(Result);	

	