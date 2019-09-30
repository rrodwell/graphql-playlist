const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  //Don't need to create ID bc mongo will handle this in the DB
  name: String,
  genre: String,
  authorId: String
});

//Model refers to collection in the DB
module.exports = mongoose.model('Book', bookSchema);