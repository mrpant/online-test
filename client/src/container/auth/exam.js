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
        this.currentPager = 0;
        this.submitButton = '';


      	if (performance.navigation.type == 1) { //IF PAGE RELOAD THEN WILL REMOVE KEY FROM LOCALSTORAGE DURING EXAM;
      		window.localStorage.removeItem('examQuestion');
          window.localStorage.removeItem('pager');
  	     }

         this.onUnload = this.onUnload.bind(this);
                 
      }


     onUnload(event) { // the method that will be used for both add and remove event
        console.log("hellooww")
        event.returnValue = "Changes you made may not be saved";
    }

    componentDidMount() {
       window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }



       countTime(minutes) { // calculate time counter 
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
                 setTimeout(function(){
                  setTimeout(tick, 1000);
                  },1000);
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



       getIndexByProperty(data, key, value) { // get index of array
          for (var i = 0; i < data.length; i++) {
              if (data[i][key] == value) {
                  return i;
              }
          }
          return -1;
      }


   
     

      prepareOptionResult(object,event){ // option selection logic

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
                    option : this.result
                 };  

                window.localStorage.setItem('examQuestion',JSON.stringify(Array(answerObject)));
               
              }else{

                var existingObject =   JSON.parse(window.localStorage.getItem('examQuestion')) || [];
                

                     let answerObject = {
                      _id :  object._id,
                      marks : 1,     
                      option : this.result 
                    };  

                  
                    var Index = this.getIndexByProperty(existingObject, "_id" , object._id);
                    if (Index > -1) {
                        existingObject[Index] = answerObject;
                    } else {
                        existingObject.push(answerObject);
                    }

                 // existingObject.push(answerObject);
                window.localStorage.setItem('examQuestion',JSON.stringify(existingObject)); 
               

              }  

              
          }else{ // else condition for if wrong answer
            console.log("Faild");

               if(window.localStorage.getItem('examQuestion') == null){

                  let answerObject = {
                    _id :  object._id,
                    marks : 0,   
                    option : this.result
                 };  

                window.localStorage.setItem('examQuestion',JSON.stringify(Array(answerObject)));
               
              }else{

                var existingObject =   JSON.parse(window.localStorage.getItem('examQuestion')) || [];
                

                     let answerObject = {
                      _id :  object._id,
                      marks : 0,   
                      option : this.result
                    };  

                   var Index = this.getIndexByProperty(existingObject, "_id" , object._id);
                    if (Index > -1) {
                        existingObject[Index] = answerObject;
                    } else {
                        existingObject.push(answerObject);
                    }
                      

              //  existingObject.push(answerObject);
                window.localStorage.setItem('examQuestion',JSON.stringify(existingObject)); 
               

              } 

          } // end of else

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

          if(window.localStorage.getItem('examQuestion') == null  || JSON.parse(window.localStorage.getItem('examQuestion')).length  <= 29 ){
            alert("Sorry!!,Now You can't Submit this Test,Please Attampted all Questions before submitting... !!");
            return false;
        
          }



          if(window.localStorage.getItem('examQuestion') != null ){
                  
                  var resultValue =  JSON.parse(window.localStorage.getItem('examQuestion'));
                  var counter = 0 ;

                  for (var i = 0; i < resultValue.length; i++) {
                          if(resultValue[i].option[0] == true || resultValue[i].option[1] == true || resultValue[i].option[2] == true || resultValue[i].option[3] == true ){
                            counter++;
                          }
                  }

             if(counter <= 29){
                 alert("Sorry!!,You Attampted Only "+ counter + "Question") ;
                
                return false;
             }     

          }

        var result = confirm("Do You want to submit this Test ??");
        if(result){
            browserHistory.push('/result');
          
        }
      }

      cancelFinalTest(event){
        var result  = confirm("Do you Want to Cancel this Test ??");

        if(result){
          browserHistory.push('/test');
           window.localStorage.removeItem('pager');
        }
        
      }

       handleClick(event) { // CUSTOM ACTION FOR GET CURRENT PAGE SYATE 

        this.setState({
          currentPage: Number(event.target.id),

        });

        if(window.localStorage.getItem('pager') != null){ // validate pager number for question 
            if(event.target.id == 2)
            {
              window.localStorage.setItem('pager',11)
            }else if(event.target.id == 3){
              window.localStorage.setItem('pager',21)
            }else{
              window.localStorage.setItem('pager',1);

            }

        }

           if(event.target.id == 3){ // for visibility of submit at last

             this.submitButton = <div className="submit_test">
                              <button id="submit_test" className="btn btn-success "   onClick={this.submitFinalTest.bind(this)}
                              >Sumit Test</button>&nbsp;&nbsp;&nbsp;
                               <button id="cancel_test" className="btn btn-danger "   onClick={this.cancelFinalTest.bind(this)}
                              >Cancel Test</button>
                              </div>;
            }else{
              this.submitButton = "";
            }


      }




      render() {         // render html
       
      	var renderPageNumbers = 0;
      	var renderTodos = "";

      	if(this.props.questionExam != null){
            this.countTime(30);


            if(window.localStorage.getItem('pager') == null){

                	this.state = {
        	        todos: this.props.questionExam,
        	        currentPage: 1,
        	        todosPerPage: 10,
      	      	 }  

                 window.localStorage.setItem('pager',1);

             }


	        const { todos, currentPage, todosPerPage  } = this.state;
	        const indexOfLastTodo = currentPage * todosPerPage;
	        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
	        const pageNumbers = [];
      
      //  console.log("Curerent"+JSON.stringify(currentTodos)); 
        if(todos.length <= 29){
        	alert("Question are Preparing by Admin!! , Max 30 Questions should be Their , <<As Requirement not Matched>>!! Now not Permitted for this Exam..");
        	 browserHistory.push('/test');
        	return false;
        }
        	
         renderTodos = currentTodos.map((value, index) => {

                 //for state prevent of checkbox

                  if(window.localStorage.getItem('examQuestion') != null){

                    var checkedBox = JSON.parse(window.localStorage.getItem('examQuestion'));

                      for (var i = 0; i < checkedBox.length; i++) {
                     
                       if(value._id  == checkedBox[i]._id){
                  

                              if(checkedBox[i].option[0] == true){
                                 var id_1 = checkedBox[i]._id+'-1';
                                 setTimeout(function(){
                              
                                 document.getElementById(id_1).setAttribute('checked',true);
                                },200);
                              }
                              if(checkedBox[i].option[1] == true){
                                var id_2 = checkedBox[i]._id+'-2';
                                  setTimeout(function(){
                                
                                 document.getElementById(id_2).setAttribute('checked',true);
                                },200);
                              }
                              if(checkedBox[i].option[2] == true){
                                var id_3 = checkedBox[i]._id+'-3';
                                 setTimeout(function(){
                                 
                                 document.getElementById(id_3).setAttribute('checked',true);
                                },200);
                              }
                              if(checkedBox[i].option[3] == true){
                                var id_4 = checkedBox[i]._id+'-4';
                                 setTimeout(function(){
                                     
                                 document.getElementById(id_4).setAttribute('checked',true);
                                },200);
                              }

                            
                       

                       }

                      
                    
                      }


                  }




          this.currentPager = parseInt(window.localStorage.getItem('pager'));

          return <li key={index}>
          			 <div className="row">
          			 <div className="col-sm-9">
          			 <strong className="quest">&nbsp;{index + this.currentPager}-&nbsp;&nbsp;{value.question}</strong>
                 <br/>
          			 </div>
          			 <div className="col-sm-2">
          				<strong className="quest marks"> -Marks 1</strong>
          			 </div>
          			 <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" key={index + this.currentPager+'-1'}  id={value._id+'-1'} value={1}  onChange={this.prepareOptionResult.bind(this,value)} /> {value.option_one}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" key={index + this.currentPager+'-2'} id={value._id+'-2'}  value={2}  onChange={this.prepareOptionResult.bind(this,value)} />  {value.option_two}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" key={index + this.currentPager+'-3'} id={value._id+'-3'} value={3}  onChange={this.prepareOptionResult.bind(this,value)}  />  {value.option_three}</label>
			      	   </div>
			      	   <div className="col-sm-12"> 
			      	   <label> <input type="checkbox" key={index + this.currentPager+'-4'} id={value._id+'-4'} value={4}  onChange={this.prepareOptionResult.bind(this,value)} />  {value.option_four}</label>
			      	   </div>
				         </div>
          	     </li>;
        });


          var submitQuestion = null; 

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
                    <strong>Note : All Question Should be mandatory to Attampted, 1 Marks for Each Question..</strong>
            			 <br/>
                   <br/>
            			 <div className="blank_w3ls_agile">
            			 <div className="">

      		         <br/>
                  

      			       <h2 className="w3_inner_tittle">Question Listing</h2>
                   <div  className="timer" >Time : &nbsp;&nbsp;<strong id="timer"> : 00:00:00</strong></div>
      	           <ul>
      	           {renderTodos}
      	            </ul>
                    <br/>
                    <ul id="page-numbers">
      	              {renderPageNumbers}
      	           </ul>

                    {this.submitButton}
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

	