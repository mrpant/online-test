import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';						
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

class Exam extends Component{



	 constructor(props) { // CONSTRUCOR FOR INIT VARIABLE
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.props.getExamList();
      	this.result = [];
 		    this.tempKey = '';
    	  this.finalString = '';
        this.attemptCounter = 0;


      	if (performance.navigation.type == 1) { //IF PAGE RELOAD THEN WILL REMOVE KEY FROM LOCALSTORAGE DURING EXAM;
      		window.localStorage.removeItem('examQuestion');
          window.localStorage.removeItem('attemptCounter');
  	     }
       
      }

       countTime(minutes) {
        var self = this;
          var seconds = 60;
          var mins = minutes
          function tick() {
              var counter = document.getElementById("timer");
              var current_minutes = mins-1
              seconds--;
              counter.innerHTML =
              current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
              if( seconds > 0 ) {
                  setTimeout(tick, 1000);
              } else {

                  if(mins > 1){
                    self.countTime(mins - 1); 

                  }else{  
                    alert("Time Out, Please Start Again!!");
                    browserHistory.push('/test');
                    clearTimeout(self.countTime);
                  }
              }
          }
          tick();



      }


      addOrReplace( argh , obj ) {  //FUNCTION FOR MANAGE ARRAY AND OBJECT
  			var index = -1;
  		  argh.filter((el, pos) => {
  		    if( el._id == obj._id )
  		      delete argh[index = pos];
  		    return true;
  		  });
  		  argh[index] = obj;
  		}


  
      handleClick(event) { // CUSTOM ACTION FOR GET CURRENT PAGE SYATE 
        this.setState({
          currentPage: Number(event.target.id),

        });
      }

      prepareOptionResult(object,event){

       var answer_1,answer_2,answer_3,answer_4;
       console.log(this.tempKey);
       console.log(object._id);

       if(this.tempKey !== object._id){
           this.tempKey = "";
               answer_1 = false;
               answer_2 = false;
               answer_3 = false;
               answer_4 = false;
           this.result = [];
         }


        if(this.tempKey == ""){
          this.tempKey = object._id; 
               answer_1 = false;
               answer_2 = false;
               answer_3 = false;
               answer_4 = false;

               if(window.localStorage.getItem('attemptCounter') == null){
                  window.localStorage.setItem('attemptCounter',1);
                }else{
                   var   existingCounter = parseInt(JSON.parse(window.localStorage.getItem('attemptCounter')));
                    existingCounter = existingCounter +  1;
                    window.localStorage.setItem('attemptCounter',JSON.stringify(existingCounter)); 
                }
           
         } 

         

       

        if(this.tempKey == object._id){

          console.log(object);

              
      
              if(event.target.value == 1){
                    answer_1 = event.target.checked;  
                    if(answer_1){
                      this.result[0] = true
                    }else{
                      this.result[0] = false;
                    }
                    
              }

              if(event.target.value == 2){
                 answer_2 = event.target.checked;  
                  if(answer_2){
                      this.result[1] = true
                    }else{
                      this.result[1] = false;
                    }
              }

              if(event.target.value == 3){
                answer_3 = event.target.checked;  
                 if(answer_3){
                      this.result[2] = true
                    }else{
                      this.result[2] = false;
                    }
              }


              if(event.target.value == 4){
                   answer_4 = event.target.checked;
                  if(answer_4){
                      this.result[3] = true
                    }else{
                      this.result[3] = false;
                    }
              }   

               if(this.result[0] == undefined){ // validate if undefined
                 this.result[0] = false;
                }
                if(this.result[1] == undefined){
                   this.result[1] = false;
                }
                if(this.result[2] == undefined){
                   this.result[2] = false;
                }
                if(this.result[3] == undefined){
                   this.result[3] = false;
                }


             
              console.log("answer_1"+this.result[0] );
              console.log("answer_2"+this.result[1] );
              console.log("answer_3"+this.result[2] );
              console.log("answer_4"+this.result[3] );



       if( object.option_one_isAnswer == this.result[0] && object.option_two_isAnswer == this.result[1] && object.option_three_isAnswer == this.result[2] && object.option_four_isAnswer== this.result[3]){
              
               
            console.log("pass")
              if(window.localStorage.getItem('examQuestion') == null){

                  let answerObject = {
                    _id :  object._id,
                    marks : 1,   
                 };  

                window.localStorage.setItem('examQuestion',JSON.stringify(Array(answerObject)));
               
              }else{

                var existingObject =   JSON.parse(window.localStorage.getItem('examQuestion')) || [];
                

                     let answerObject = {
                      _id :  object._id,
                      marks : 1,   
                    };  

             

                existingObject.push(answerObject);
                window.localStorage.setItem('examQuestion',JSON.stringify(existingObject)); 
               

              }  

              
          }else{
            console.log("Faild");
          }

        }


     


       

        } 


       numKeys(o) { // GET UNIQUE KEY
         var res = 0;
         for (var k in o) {
             if (o.hasOwnProperty(k)) res++;
         }
         return res;
       } 


    	removeLastComma(str) { 
		   return str.replace(/,(\s+)?$/, '').replace(/^"/, "").replace(/"$/, "");;   
		  }

      submitFinalTest(event){

          if(window.localStorage.getItem('attemptCounter') == null  || parseInt(window.localStorage.getItem('attemptCounter'))  <= 29 ){
            alert("Sorry!!,Now You can't Submit this Test,Please Attampted First all Questions...!!");
            return false;
          }

        var selectedAnswer = JSON.parse(window.localStorage.getItem('examQuestion'));


        var result = confirm("Do You want to submit this Test ??");
        if(result){
            browserHistory.push('/result');
          
        }
      }

      cancelFinalTest(event){
        var result  = confirm("Do you Want to Cancel this Test ??");

        if(result){
          browserHistory.push('/test');
        }
        
      }


      render() {

      	var renderPageNumbers = 0;
      	var renderTodos = "";

      	if(this.props.questionExam != null){
            this.countTime(60);
          	this.state = {
  	        todos: this.props.questionExam,
  	        currentPage: 1,
  	        todosPerPage: 10,
	      	 }

	        const { todos, currentPage, todosPerPage  } = this.state;
	        const indexOfLastTodo = currentPage * todosPerPage;
	        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
	        const pageNumbers = [];

        if(todos.length <= 29){
        	alert("Question are Preparing by Admin!! , Max 30 Questions should be Their , <<As Requirement not Matched>>!! Now not Permitted for this Exam..");
        	 browserHistory.push('/test');
        	return false;
        }
        	
         renderTodos = currentTodos.map((value, index) => {
          return <li key={index}>
          			 <div className="row">
          			 <div className="col-sm-9">
          			 <strong className="quest">{value.question}</strong>
          			 </div>
          			 <div className="col-sm-2">
          				<strong className="quest marks"> -Marks 1</strong>
          			 </div>
          			   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" value={1}  onChange={this.prepareOptionResult.bind(this,value)} /> {value.option_one}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" value={2}  onChange={this.prepareOptionResult.bind(this,value)} />  {value.option_two}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" value={3}  onChange={this.prepareOptionResult.bind(this,value)}  />  {value.option_three}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" value={4}  onChange={this.prepareOptionResult.bind(this,value)} />  {value.option_four}</label>
			      	   </div>
				         </div>
          	     </li>;
        });


          var submitQuestion = null; 
          todos.length = 2;
		       for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
		          pageNumbers.push(i);
		        }
		         renderPageNumbers = pageNumbers.map(number => {
  		          return (
  		            <li
  		              key={number}
  		              id={number}
  		              onClick={this.handleClick}>
  		              {number}
  		            </li>
  		          );
  		        });

   	        } // end of if condition

              return (
                   <div className="inner_content_w3_agile_info two_in">
            			 <br/>
            			 <div className="blank_w3ls_agile">
            			 <div className="">
      		         <br/>
      			       <h2 className="w3_inner_tittle">Question Listing</h2>
                   <div  className="timer" >Time : &nbsp;&nbsp;<strong id="timer"> : 00:00:00</strong></div>
      	           <ol>
      	           {renderTodos}
      	            </ol>
                    <ul id="page-numbers">
      	              {renderPageNumbers}
      	           </ul>
                    <div className="submit_test">
                    <button id="submit_test" className="btn btn-success "   onClick={this.submitFinalTest.bind(this)}
                    >Sumit Test</button>&nbsp;&nbsp;&nbsp;
                    <button id="cancel_test" className="btn btn-danger "   onClick={this.cancelFinalTest.bind(this)}
                    >Cancel Test</button>
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



export default connect(mapStateToProps, actions)(Exam);	

	