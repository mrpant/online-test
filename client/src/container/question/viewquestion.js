import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';

class Viewquestion extends Component{
						constructor(props) {
   							super(props);
							this.props.getQuestionList();
						}	

						  componentWillMount() {

						  }	

	
					render(){
							
						return (
							 <div className="inner_content_w3_agile_info two_in">
							 <br/>
							 
					 			 <div className="blank_w3ls_agile">

									<div className="blank-page agile_info_shadow">
									 <a href="addquestion">Add Question</a>
									 <br/>
									<h2 className="w3_inner_tittle">Question Listing</h2>
										<BootstrapTable data={this.props.question} striped={true} hover={true} pagination maxHeight='450px'  >
									      <TableHeaderColumn dataField="sn" isKey={true} dataAlign="center" dataSort={true}>#</TableHeaderColumn>
									      <TableHeaderColumn dataField="question" dataSort={true}>Questions</TableHeaderColumn>
									      <TableHeaderColumn dataField="mark" dataSort={true}>Marks</TableHeaderColumn>
	
									  </BootstrapTable>
									</div>
								</div>

								 
							
				   		 </div>
		  			 );
				}

		}

function mapStateToProps(state){
	return{
		question:state.question.questionData
	};

}

export default connect(mapStateToProps, actions)(Viewquestion);	

	