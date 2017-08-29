import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';					

class Userdashboard extends Component{

					constructor(props) { // CONSTRUCOR FOR INIT VARIABLE
						super(props);
						this.props.getUserList();
					 }	

				  onClickProductSelected(cell, row, rowIndex){
				   console.log('Product #', rowIndex);
				  }


				  cellButton(cell, row, enumObject, rowIndex){ //ACTIVATE USER CUSTOM ACTION
					    return (
						       <button type="button" className="btn btn-success" onClick={() =>  this.onClickProductSelected(cell, row, rowIndex)} >
						   			{ cell }
						       </button>
					    	   )
					 }	

	
					render(){

						return (
							 <div className="inner_content_w3_agile_info two_in">
							 <br/>
					 			 <div className="blank_w3ls_agile">
									<div className="blank-page agile_info_shadow">
									<h2 className="w3_inner_tittle">Registered User Listing</h2>
									 <BootstrapTable data={this.props.user} striped={true} hover={true} pagination maxHeight='450px'  >
									      <TableHeaderColumn dataField="sn" isKey={true} dataAlign="center" dataSort={true}>#</TableHeaderColumn>
									      <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
									      <TableHeaderColumn dataField="username" dataSort={true}>Username</TableHeaderColumn>
									  	  <TableHeaderColumn dataField="status" dataFormat={this.cellButton.bind(this)}>Status</TableHeaderColumn>	
									  </BootstrapTable>
									</div>
								</div>
				   		 </div>
		  			 );
				}
		}


function mapStateToProps(state){
	return{
		user:state.auth.users
	};

}

export default connect(mapStateToProps, actions)(Userdashboard);	