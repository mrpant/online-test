import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Addquestion  extends Component{


				 handleFormSubmit(formProps) {
			 			
			    		this.props.addQuestion(formProps);
				 }


				render(){
						
					  const { handleSubmit, fields: { question , option_one,option_one_isAnswer,option_two, option_two_isAnswer,option_three,option_three_isAnswer,option_four,option_four_isAnswer } } = this.props;


					return (
							 <div className="inner_content_w3_agile_info two_in">
							 <br/>
							 		
					 			 <div className="blank_w3ls_agile">

									<div className="blank-page agile_info_shadow">
									 <a href="viewquestion">View All Questions</a>
									  <br/>
									   <br/>
									    
							<div className="col-md-12 button_set_one agile_info_shadow graph-form">
											 <h3 className="w3_inner_tittle two">Prepare Questions</h3>

												<div className="grid-1">
														<div className="form-body">
												<form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
												 <div className="form-group">
												  <label  className="col-sm-2 control-label">Question</label>
												   <div className="col-sm-9"> 
												   <textarea className="form-control" placeholder="Add Question Here" {...question} required ></textarea>
												
												   </div>
												    </div>

												     <div className="form-group">
												      <label className="col-sm-2 control-label">Option One</label> 
												      <div className="col-sm-7"> 
												      <input type="text" className="form-control"  placeholder="Add Option One" {...option_one} required />
												      </div> 
												      <div className="col-sm-2"> 
												      	   <label> <input type="checkbox" {...option_one_isAnswer} /> Is Answer</label>
												      	  </div>
												      </div>

												       <div className="form-group">
												      <label className="col-sm-2 control-label">Option Two</label> 
												      <div className="col-sm-7"> 
												      <input type="text" className="form-control"  placeholder="Add Option Two" {...option_two} required />
												      </div> 
												      <div className="col-sm-2"> 
												      	   <label> <input type="checkbox" {...option_two_isAnswer}/> Is Answer</label>
												      	  </div>
												      </div>

												      <div className="form-group">
												      <label className="col-sm-2 control-label">Option Three</label> 
												      <div className="col-sm-7"> 
												      <input type="text" className="form-control"  placeholder="Add Option Three" {...option_three} required />
												      </div> 
												      <div className="col-sm-2"> 
												      	   <label> <input type="checkbox" {...option_three_isAnswer} /> Is Answer</label>
												      </div>
												      </div>

												       <div className="form-group">
												      <label className="col-sm-2 control-label">Option Four</label> 
												      <div className="col-sm-7"> 
												      <input type="text" className="form-control"  placeholder="Add Option Four" {...option_four} required />
												      </div> 

												      	  <div className="col-sm-2"> 
												      	   <label> <input type="checkbox" {...option_four_isAnswer}/> Is Answer</label>
												      	  </div>

												      </div>


												   
												            <div className="col-sm-offset-2"> 
												            <button type="submit" className="btn btn-default">Submit</button> 
												            </div> 
													</form> 
														</div>

												</div>
											</div>
									</div>
										</div>
									</div>

						
							);
						}
		}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'addquestion',
  fields: [ 

  			'question',
  		    'option_one',
  		    'option_one_isAnswer',
  		    'option_two',
  		    'option_two_isAnswer',
  		    'option_three',
  		    'option_three_isAnswer',
  		    'option_four',
  		    'option_four_isAnswer'


  		     ]


}, mapStateToProps, actions)(Addquestion);
