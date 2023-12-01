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
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    director: {
      name: "Frank Darabont",
      bio: "Frank Árpád Darabont is a French-born American filmmaker. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors, The Blob and The Fly II.",
      born: "January 28, 1959",
      died: "Alive"
    },
    stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: {
      name: "Francis Ford Coppola",
      bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or and a British Academy Film Award.",
      born:  "April 7, 1939",
      died: "Alive"
    },
    stars: ["Marlon Brando", "Al Pacino", "James Caan"],
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: {
      name: "Christopher Nolan",
      bio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide.",
      born: "July 30, 1970 ",
      died: "Alive"
    },
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckheart"],
  },
  {
    id: 4,
    title: "The Godfather Part II",
    year: 1074,
    genre: ["Crime", "Drama"],
    director: {
      name: "Francis Ford Coppola",
      bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or and a British Academy Film Award.",
      born:  "April 7, 1939",
      died: "Alive"
    },
    
    stars: ["Al Pacino", "Robert DeNero", "Robert Dubal"],
  },
  {
    id: 5,
    title: "12 Angry Men",
    year: 1957,
    genre: ["Crime", "Drama"],
    director: {
      name: "Sidney Lumet",
      bio: "Sidney Arthur Lumet was an American film director. Lumet started his career in theatre before transitioning to film where he gained a reputation for making realistic and gritty New York dramas which focused on the working class, tackled social injustices and often questioned authority.",
      born: "June 25, 1924",
      died: "April 9, 2011,"
    },
    stars: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
  },
  {
    id: 6,
    title: "Schindler's List",
    year: 1993,
    genre: ["Biography", "Drama", "History"],
    director: {
      name: "Steven Spielberg",
      bio: "Steven Allan Spielberg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.",
      born: "December 18, 1946",
      died: "Alive"
    },
    stars: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
  },
  {
    id: 7,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    genre: ["Action", "Adventure", "Drama"],
    director: {
      name: "Peter Jackson",
      bio: "Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien. ",
      born: "October 31, 1961",
      died: "Alive"
    },
    stars: ["Elija Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    id: 8,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: {
      name: "Quentin Tarantino",
      bio: "Quentin Jerome Tarantino is an American film director, screenwriter, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
      born: "March 27, 1963",
      died: "Alive"
    },
    stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
  },
  {
    id: 9,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    genre: ['Action', 'Adventure', 'Drama'],
    director: {
      name: "Peter Jackson",
      bio: "ir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien. ",
      born: "October 31, 1961",
      died: "Alive"
    },
    stars: ["Elija Wood", "Ian McKellen", "Orlando Bloom"],
  },
  {
    id: 10,
    title: "The Good, the Bad and the Ugly",
    year: 1966,
    genre: ['Adventure', 'Western'],
    director: {
      name: "Sergio Leone",
      bio: "Sergio Leone was an Italian film director, producer, and screenwriter, credited as the pioneer of the spaghetti Western genre. He is widely regarded as one of the most influential directors in the history of cinema. Leone's film-making style includes juxtaposing extreme close-up shots with lengthy long shots.",
      born: "January 3, 1929",
      died: "April 30, 1989"
    },
    stars: ["Clint Eastwood", "Eli Wallach", "Lee Van Cleef"]
  },
]

let users = [
  {
    "name": "John Doe",
    "email": "jd@mail.com",
    "favorite-movies": []
  },
  {
    "name": "Jane Doe",
    "email": "janed@mail.com",
    "favorite-movies": []
  },
  {
    "name": "Frank Lee",
    "email": "frank@gmail.com",
    "favorite-movies": []
  },
];

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
});

//Add new user
app.post('/users', (req, res) => {
  //TO DO
});

//Update a user name
app.put('/users/:username', (req, res) => {
  //TO DO
});

//Add movie to user's favorites
app.post('/users/:username', (req, res) => {
  //TO DO
});

//Remove movie from user's favorites
app.post('/users/:username', (req, res) => {
  //TO DO
});

//Remove user from users list
app.post('/users/:username', (req, res) => {
  //TO DO
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('File not available.')
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});