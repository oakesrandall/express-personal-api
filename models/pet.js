var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PetSchema = new Schema({
  name: String,
  species: String,
  breed: String,
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
