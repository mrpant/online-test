const jwt = require('jwt-simple');
const User = require('../models/user');
const Question = require('../models/question');
const config = require('../config');

function tokenForUser(user) { // CONFIGURED TOKEN
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret);
}


exports.userList = function(req, res, next) { // REQ FOR GET USER LIST
 User.find({role : 'user'}, function(err, users) {
    if (err) { 
          return next(err);
       }
    var userMap = [];
    var i = 1;
    users.forEach(function(user) {
       var userReq  = {};
        userReq.sn  =  i;
        userReq._id  =  user._id;
        userReq.name = user.name;
        userReq.username = user.username;
        userReq.status = (user.status == true) ? "Active" : "In-Active";
        userMap.push(userReq);
      i++;
    });

    res.send(userMap);  
  });

}




exports.signin = function(req, res, next) { // REQ FOR GET LOGIN DETAILS
  // User has been authenticated, send back token
  const username = req.body.username;
  User.findOne({ username: username  }, function(err, existingUser) {
       if (err) { 
          return next(err);
        }
       if(existingUser != null) {
          res.send({ token: tokenForUser(req.user) });

       }else{
          return res.send({ status : false , msg : 'Invalid User!! For Activation Your Account, Contact Your Administrator'});
       }
  });
}




exports.signup = function(req, res, next) { // REQ FOR REGISTRATION

  const name     = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide username and password'});
  }
  // See if a user with the given username exists
  User.findOne({ username: username }, function(err, existingUser) {
    if (err) { return next(err); }
    // If a user with username does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'username is in use' });
    }
    // If a user with username does NOT exist, create and save user record
    const user = new User({
      name : name,
      username: username,
      password: password,
      role: 'user'
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token : tokenForUser(user) });
    });
  });
}





exports.addQuestion = function(req, res, next){ // REQ FOR ADD NEW QUESTION

   const question = new Question({
     question    : req.body.question,
     option_one  : req.body.option_one,
     option_one_isAnswer : req.body.option_one_isAnswer ? true : false,
     option_two     : req.body.option_two,
     option_two_isAnswer : req.body.option_two_isAnswer? true : false,
     option_three : req.body.option_three,
     option_three_isAnswer     : req.body.option_three_isAnswer? true : false,
     option_four     : req.body.option_four,
     option_four_isAnswer : req.body.option_four_isAnswer ? true : false
    });

    question.save(function(err) {
      if (err) { return next(err); }
      // Repond to request indicating the user was created
       res.send({status: true , message : 'Successfully Added' });
    });

}

exports.updateUserStatus = function(req, res, next){ // UPDATE USER STAUS BY ADMIN
   var query = {'_id':req.body._id};
   User.findOneAndUpdate(query, {status : 1 }, function(err, doc){
      if (err) return res.send(500, { error: err });
     return res.send("succesfully saved");
  });

}

  

exports.questionList = function(req, res, next) { // REQ FOR GET QUESTION LISTING
 Question.find({}, function(err, question) {
    if (err) { 
          return next(err);
       }
    var questionMap = [];
    var i = 1;
    question.forEach(function(questionObject) {
       var questionReq  = {};
        questionReq.sn  =  i;
        questionReq._id  =  questionObject._id;
        questionReq.question = questionObject.question;
        questionReq.mark = 1;
        questionMap.push(questionReq);
      i++;
    });

    res.send(questionMap);  
  });

}


exports.examList = function(req, res, next) { // GET EXAMS LISTING
  
 Question.findRandom({}, {}, {limit: 30}, function(err, question) {
    if (err) { 
          return next(err);
       }
    var questionMap = [];
    var i = 1;
    question.forEach(function(questionObject) {
       var questionReq  = {};
        questionReq.sn  =  i;
        questionReq._id  =  questionObject._id;
        questionReq.question = questionObject.question;
        questionReq.option_one = questionObject.option_one;
        questionReq.option_one_isAnswer = questionObject.option_one_isAnswer;
        questionReq.option_two = questionObject.option_two;
        questionReq.option_two_isAnswer = questionObject.option_two_isAnswer;
        questionReq.option_three = questionObject.option_three;
        questionReq.option_three_isAnswer = questionObject.option_three_isAnswer;
        questionReq.option_four = questionObject.option_four;
        questionReq.option_four_isAnswer = questionObject.option_four_isAnswer;
        questionReq.mark = 1;
        questionMap.push(questionReq);
      i++;
    });

    res.send(questionMap);  
  });

}