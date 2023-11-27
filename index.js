const express = require('express'),
  morgan = require('morgan'),
  //Importing built-in node modules fs and path.
  fs = require('fs'),
  path = require('path');

const app = express();

let topten_movies = [
  {
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: ['Drama'],
    director: 'Frank Darabont',
    stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
  },
  {
    title: 'The Godfather',
    year: 1972,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    stars: ['Christian Bale', 'Heath Ledger', 'Aaron Eckheart']
    ,
  },
  {
    title: 'The Godfather Part II',
    year: 1074,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    stars: ['Al Pacino', 'Robert DeNero', 'Robert Dubal'],
  },
  {
    title: '12 Angry Men',
    year: 1957,
    genre: ['Crime', 'Drama'],
    director: 'Sidney Lumet',
    stars: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
  },
  {
    title: "Schindler's List",
    year: 1993,
    genre: ['Biography', 'Drama', 'History'],
    director: 'Steven Spielberg',
    stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    genre: ['Action', 'Adventure', 'Drama'],
    director: 'Peter Jackson',
    stars: ['Elija Wood', 'Viggo Mortensen', 'Ian McKellen'],
  },
  {
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    genre: ['Action', 'Adventure', 'Drama'],
    director: 'Peter Jackson',
    stars: ['Elija Wood', 'Ian McKellen', 'Orlando Bloom'],
  },
  {
    title: 'The Good, the Bad and the Ugly',
    year: 1966,
    genre: ['Adventure', 'Western'],
    director: 'Sergio Leone',
    stars: ['Clint Eastwood', 'Eli Wallach', 'Lee Van Cleef']
  },
]

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
  res.json(topten_movies);
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('File not available.')
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});