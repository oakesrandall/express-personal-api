// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function (req, res) {
    // TODO: Document all your api endpoints below
    res.json({
        message: "Welcome to my personal api! Here's what you need to know!",
        documentation_url: "https://github.com/oakesrandall/express-personal-api/blob/master/README.md", // CHANGE ME
        base_url: "https://damp-tundra-18179.herokuapp.com",
        endpoints: [
            { method: "GET", path: "/api", description: "Describes all available endpoints" },
            { method: "GET", path: "/api/profile", description: "Data about me" },
            { method: "POST", path: "/api/pets", description: "Create a new pet" }
        ]
    });
});

app.get('/api/profile', function (req, res) {
    res.json({
        name: 'David Randall',
        github_link: 'https://github.com/oakesrandall',
        github_profile_image: 'https://avatars0.githubusercontent.com/u/24509797?v=4&u=c5a0d0826c89780c4079e2128a92390d843c6dc3&s=400',
        current_city: 'Colorado Springs'
    });
});

app.post('/api/pets', function (req, res) {
    // res.send(console.log('hit pets post route'));
    // res.send(console.log('request: ' + req.body));
    var newPet = new db.Pet({
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
    });
    newPet.save(function(err, pet) {
        if (err) {
            return console.log('save error: ' + err);
        }
        console.log('saved ', pet.name);
        res.json(pet);
    });
});

app.get('/api/pets', function (req, res) {
    db.Pet.find(function(err, pets) {
        if (err) {
            return (console.log('No pets to show'));
        }
        res.json(pets);
    });
});

app.get('/api/pets/:name', function(req, res) {
  db.Pet.findOne({name: req.params.name}, function(err, pet) {
    console.log(req.params.name);
    if (err) {
      return console.log('that pet does not exist' + err);
    }
    res.json(pet);
  });
});

app.put('/api/pets/:name', function(req, res) {
    console.log('hit put route for ' + req.params.name);
    db.Pet.findOne({name: req.params.name}, function(err, pet) {
        pet.name    = req.body.name;
        pet.species = req.body.species;
        pet.breed   = req.body.breed;
        console.log(req.body.breed);
        if (err) {
            return console.log('that pet does not exist' + err);
        } 
        res.json(pet);
    });
});

app.delete('/api/pets/:name', function(req, res) {
    console.log('hit delete route, trying to delete ' + req.params.name);
    db.Pet.findOneAndRemove({name: req.params.name}, function(err, deletedPet) {
        if (err) {
            return console.log('that pet does not exist' + err);
        }
        res.json(deletedPet);
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});