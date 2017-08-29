
//Authentication route handlers
const Authentication = require('./controllers/controller');
//Passport middleware module and setup
const passport = require('passport');
const passportStrategies = require('./services/passport_strategies');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
//Custom express routing middleware that checks to see if the authenticated user is an admin
const requireAdmin = require('./services/requireAdmin')
module.exports = function(app) {



  
  // using requireSignin passport middleware to authenticate for protected route using local (email/password) strategy)
  // Authentication.signin sends back JWT token to authenticated user
  app.post('/signin', requireSignin, Authentication.signin);
  app.get('/userlist' , requireAuth, requireAdmin , Authentication.userList, function(req, res, next) {
    res.send({ message: 'server response:  this GET request has been authorized' });
  });
   app.get('/questionlist' , requireAuth, requireAdmin , Authentication.questionList, function(req, res, next) {
    res.send({ message: 'server response:  this GET request has been authorized' });
  });
   app.get('/examlist' , Authentication.examList, function(req, res, next) {
    res.send({ message: 'server response:  this GET request has been authorized' });
  });
  // route for signing up user
  app.post('/signup', Authentication.signup);
  app.post('/updatestatus', Authentication.updateUserStatus);
  app.post('/addquestion', Authentication.addQuestion);


}
