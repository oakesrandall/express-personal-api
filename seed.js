// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newPet = [{
    name: "Minnie",
    species: "Dog",
    breed: "Great Dane",
}, {
    name: "Dexter",
    species: "Turtle",
    breed: "Who the hell knows?",
}];

db.Pet.remove({}, function(err, pets) {
    if (err) {
        console.log("Error: ", err);
    }
    console.log("removed all pets");
    db.Pet.create(newPet, function(err, pet) {
        if (err) {
            return console.log("Error: ", err);
        }
        console.log("rebuilt pets");
        process.exit();
    });
});