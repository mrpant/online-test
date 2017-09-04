import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Review extends Component{



	   constructor(props) { // CONSTRUCOR FOR INIT VARIABLE
        super(props);
         if(window.localStorage.getItem('examQuestion') == null){
          alert("No Result Found");
          browserHistory.push('/test');
         }


         this.props.getExamList();
         this.review = '';
          this.onUnload = this.onUnload.bind(this);
        
        
        }



    onUnload(event) { // the method that will be used for both add and remove event
     
        event.returnValue = "Changes you made may not be saved";
    }

    componentDidMount() {

       window.addEventListener("beforeunload", this.onUnload);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }




        gotoResult(event){
            var result = confirm("Do you want to Proceed for view Score ??");
            if(result){
              browserHistory.push('/result');
              
            }
        }




        render() {

             if( this.props.questionExam != null ){

               this.review = this.props.questionExam.map((value, index) => {

                          if(window.localStorage.getItem('examQuestion') != null){
                                  var checkedBox = JSON.parse(window.localStorage.getItem('examQuestion'));
                           for (var i = 0; i < checkedBox.length; i++) {   

                                if(checkedBox[i]._id  == value._id && checkedBox[i].isReview == true){
                                      

                                      if(checkedBox[i].option[0] == true){
                                        var option_one = <li><p>{value.option_one} <strong>is Selected</strong></p></li> ;
                                      }
                                      if(checkedBox[i].option[1] == true){
                                        var option_two = <li><p>{value.option_two} <strong>is Selected</strong></p></li>;
                                      }
                                      if(checkedBox[i].option[2] == true){
                                         var option_three = <li><p>{value.option_three} <strong>is Selected</strong></p></li>;
                                      }
                                      if(checkedBox[i].option[3] == true){
                                         var option_four = <li><p>{value.option_four} <strong>is Selected</strong></p></li>;
                                      } 



                                  return <li key={index}>
                                     <div className="row">
                                     <div className="col-sm-12">
                                     <strong className="quest1">{value.question}</strong>

                                     </div>
                                    </div>
                                     <br/><br/>
                                    <div className="row">
                                    <div className="col-sm-12">
                                     <ul className="option_align">
                                      {option_one}
                                      {option_two}
                                      {option_three}
                                      {option_four}
                                     </ul>
                                       </div>
                                       </div>
                                    
                                     </li>;




                                }
                           }
                          } 

                       });



                       


             }

              return (

                   <div className="inner_content_w3_agile_info two_in">
                   
            			 <div className="blank_w3ls_agile">
            			 <div className="">

      		         <br/>
                  

      			       <h2 className="w3_inner_tittle">Review Listing</h2>
                  
      	            <ul>
      	           {this.review}
      	            </ul>
                  



            	  		</div>

                    <div className="row">
                    <br/><br/>
                   
                    <div className="col-sm-6">
                    <a href="javascript:void(0);"  className="btn btn-success"  onClick={this.gotoResult.bind(this)} >View Score</a>
                    </div>
                    </div>

            			</div>
            			</div>

          	   );




        }

		}



   function mapStateToProps(state){
  	return{
  		questionExam:state.question.examData
  	};
  }






export default connect(mapStateToProps, actions)(Review);	

	