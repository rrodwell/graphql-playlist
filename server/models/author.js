const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  //Don't need to create ID bc mongo will handle this in the DB
  name: String,
  age: Number,
});

//Model refers to collection in the DB
module.exports = mongoose.model('Author', authorSchema);