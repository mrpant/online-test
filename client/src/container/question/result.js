import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';
import { browserHistory } from 'react-router';

class Result extends Component{
			

			constructor(props){
				super(props);

				if(window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == undefined){
					browserHistory.push('/');
					setTimeout(function(){
						window.location.reload();
					},500);
				}

			   this.resultView = JSON.parse(window.localStorage.getItem('examQuestion'));
			   this.correct = 0;
			   this.wrong = 0;
			   this.totalNoQuestion = this.resultView.length;
			   this.resultView.map(value => {  
			   		if(value.marks == 1){
			   			this.correct++;
			   		}
			  
			   		if(value.marks == 0 ){
			   			this.wrong++;
			   		}
			   });



			}	

			  


	
					 render(){


					 	const _resTemp  = <div><br/><center><h1>Welcome to Online Test....</h1></center>
					 					 <br/><br/><center><strong>Total Number of Attemped Question : {this.totalNoQuestion}</strong></center>
					 					 <br/><br/><center><strong className="greenClass">Total Number of Correct Question's Answer : {this.correct}</strong></center>
					 					 <br/><br/><center><strong className="redClass">Total Number of Wrong Question's Answer : {this.wrong} </strong></center>
					 				     <br/><br/><center><h1>Your Score: {this.correct} / {this.totalNoQuestion} </h1></center>			
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

	