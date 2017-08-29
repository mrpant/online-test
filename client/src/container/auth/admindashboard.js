import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';

class Admindashboard extends Component{
			

			constructor(props){
				super(props);
			    this.props.getUserList();
			}	

			  onClickProductSelected(_id){ //ACTIVATE USER BY ADMIN
			   this.props.updateStatus(_id);
			  }


			  cellButton(cell, row, enumObject, rowIndex){ // CUSTOM ACTION FOR CHANGE STATUS 
				      return (
					       <button type="button" className={ (cell == 'Active' ?  ' btn btn-success' : 'btn btn-danger') } onClick={() =>  this.onClickProductSelected(row._id)} >
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

export default connect(mapStateToProps, actions)(Admindashboard);	

	