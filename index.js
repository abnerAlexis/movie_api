const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//Require Mongoose package, "models.js" and Mongoose Models
const mongoose = require('mongoose');
const Models = require('./models');

const Movies = Models.Movie;
const Users = Models.User;
const Stars = Models.Star;

//Connect Mongoose to myFlixDB
mongoose.connect('mongodb://localhost:27017/myFlixDB', 
{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

//creating a write stream in append mode, and a txt file in root dir.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('Welcome to the movie app!');
});

app.use(express.static('public'));

// http://localhost:8080/movies displays the top ten movies in JSON format
app.get('/movies', (req, res) => {
  res.json(movieLibrary);
});

// Adds a new movie
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movieLibrary.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//Get genre by title
app.get('/movies/:title', (req, res) => {
  let movie = movieLibrary.find(m => m.title === req.params.title);

  if (movie) {
    res.status(200).send('Genre: ' + movie.genre.toString());
  } 
  res.status(400).send('Invalid title');
});

//Get director (bio, birth year, death year) by title.
app.get('/movies/:director', (req, res) => {
 //TO DO
 res.send("Director Data");
});

//Add new user
app.post('/users', (req, res) => {
  //TO DO
  res.send("Add new user");
});

//Update a user name
app.put('/users/:username', (req, res) => {
  res.send("Update a user's name")
  //TO DO
});

//Add movie to user's favorites
app.post('/users/:username', (req, res) => {
  //TO DO
  res.send("Add movie to a user's favorite movies");
});

//Remove movie from user's favorites
app.post('/users/:username', (req, res) => {
  //TO DO
  res.send("Remove a movie from user's favorite movies")
});

//Remove user from users list
app.post('/users/:username', (req, res) => {
  //TO DO
  res.send("Remove a user from the users list")
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('File not available.')
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});