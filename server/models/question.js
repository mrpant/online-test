const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

// model definition
const questionSchema = new Schema({
  question : String,
  option_one: String,
  option_one_isAnswer: { type: Boolean, default: 0 },
  option_two: String,
  option_two_isAnswer: { type: Boolean, default: 0 },
  option_three: String,
  option_three_isAnswer: { type: Boolean, default: 0 },
  option_four : String, 
  option_four_isAnswer : { type: Boolean, default: 0 }
});

questionSchema.plugin(random);
//Default data for admin
const ModelClass = mongoose.model('question', questionSchema);

// Export the model
module.exports = ModelClass;
