const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let movieLibrary = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['Drama'],
    director: 'Frank Darabont',
    stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
  },
  {
    id: 2,
    title: 'The Godfather',
    year: 1972,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    stars: ['Christian Bale', 'Heath Ledger', 'Aaron Eckheart'],
  },
  {
    id: 4,
    title: 'The Godfather Part II',
    year: 1074,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    stars: ['Al Pacino', 'Robert DeNero', 'Robert Dubal'],
  },
  {
    id: 5,
    title: '12 Angry Men',
    year: 1957,
    genre: ['Crime', 'Drama'],
    director: 'Sidney Lumet',
    stars: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
  },
  {
    id: 6,
    title: "Schindler's List",
    year: 1993,
    genre: ['Biography', 'Drama', 'History'],
    director: 'Steven Spielberg',
    stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
  },
  {
    id: 7,
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    genre: ['Action', 'Adventure', 'Drama'],
    director: 'Peter Jackson',
    stars: ['Elija Wood', 'Viggo Mortensen', 'Ian McKellen'],
  },
  {
    id: 8,
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
  },
  {
    id: 9,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    genre: ['Action', 'Adventure', 'Drama'],
    director: 'Peter Jackson',
    stars: ['Elija Wood', 'Ian McKellen', 'Orlando Bloom'],
  },
  {
    id: 10,
    title: 'The Good, the Bad and the Ugly',
    year: 1966,
    genre: ['Adventure', 'Western'],
    director: 'Sergio Leone',
    stars: ['Clint Eastwood', 'Eli Wallach', 'Lee Van Cleef']
  },
]

let users = [];

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

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('File not available.')
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});