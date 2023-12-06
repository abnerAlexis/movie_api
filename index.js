const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

var movieList = [
  {
    title: "The Shawshank Redemption",
    description: "'The Shawshank Redemption' is a poignant drama that unfolds within the confines of a prison. It follows the transformative journey of Andy Dufresne, a banker wrongly convicted of murder. Amidst the harsh realities of prison life, Andy befriends fellow inmates and works to maintain his hope and dignity. The film explores themes of friendship, resilience, and the enduring power of the human spirit.",
    year: 1994,
    genre: ["Drama"],
    director: {
      name: "Frank Darabont",
      bio: "Frank Árpád Darabont is a French-born American filmmaker. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors, The Blob and The Fly II.",
      born: new Date("1959-01-28"),
      died: "--"
    },
    featured: true,
    stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    imageurl:"https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i",
  },
  {
    title: "The Godfather",
    description: "'The Godfather' is a cinematic masterpiece that delves into the intricate world of the Corleone crime family. Directed by Francis Ford Coppola, the film unfolds a tale of power, loyalty, and betrayal in the organized crime underworld. With iconic performances and a gripping narrative, it stands as a timeless exploration of family dynamics and the consequences of choices made in pursuit of power.",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: {
      name: "Francis Ford Coppola",
      bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or and a British Academy Film Award.",
      born:  new Date("1939-04-07"),
      died: "--"
    },
    featured: false,
    stars: ["Marlon Brando", "Al Pacino", "James Caan"],
    imageurl:"https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i",
  },
  {
    title: "The Dark Knight",
    description: "'The Dark Knight' is a gripping superhero thriller directed by Christopher Nolan. Batman faces his greatest challenge as he confronts the anarchic Joker, who wreaks havoc on Gotham City. The film explores complex themes of morality and chaos, anchored by outstanding performances, particularly Heath Ledger`s iconic portrayal of the Joker.",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: {
      name: "Christopher Nolan",
      bio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed more than $6 billion worldwide.",
      born: new Date("1970-07-30"),
      died: "--"
    },
    featured: false,
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    imageurl:"https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i",
  },
  {
    title: "The Godfather Part II",
    description: "'The Godfather: Part II' is a cinematic masterpiece directed by Francis Ford Coppola. The film delves into the dual narratives of Vito Corleone`s rise to power and his son Michael`s struggles to maintain the family empire. It skillfully weaves a tale of power, betrayal, and family, earning critical acclaim and multiple Academy Awards.",
    year: 1074,
    genre: ["Crime", "Drama"],
    director: {
      name: "Francis Ford Coppola",
      bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or and a British Academy Film Award.",
      born:  new Date("1939-04/07"),
      died: "--"
    },
    featured: true,
    stars: ["Al Pacino", "Robert DeNero", "Robert Dubal"],
    imageurl:"https://www.imdb.com/title/tt0071562/mediaviewer/rm4159262464/?ref_=tt_ov_i",
  },
  {
    title: "12 Angry Men",
    description: "'12 Angry Men' is a classic courtroom drama directed by Sidney Lumet. Set almost entirely in a jury room, the film revolves around 12 jurors deliberating the guilt of a young defendant accused of murder. Tensions rise as one juror challenges the unanimous decision, leading to a powerful exploration of prejudice, justice, and reasonable doubt.",
    year: 1957,
    genre: ["Crime", "Drama"],
    director: {
      name: "Sidney Lumet",
      bio: "Sidney Arthur Lumet was an American film director. Lumet started his career in theatre before transitioning to film where he gained a reputation for making realistic and gritty New York dramas which focused on the working class, tackled social injustices and often questioned authority.",
      born: new Date("1924-06-25"),
      died: new Date("2011-04-09"),
    },
    featured: false,
    stars: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    imageurl:"https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i",
  },
  {
    title: "Schindler's List",
    description: "'Schindler's List' is a 1993 film directed by Steven Spielberg. It is a powerful and poignant portrayal of the true story of Oskar Schindler, a German businessman who saved the lives of over a thousand Polish Jews during the Holocaust by employing them in his enamelware and ammunitions factories. The film is known for its stark black-and-white cinematography, moving performances, and its exploration of themes such as humanity, morality, and the impact of individual actions in the face of unspeakable atrocities. 'Schindler's List' received critical acclaim and won seven Academy Awards, including Best Picture and Best Director.",
    year: 1993,
    genre: ["Biography", "Drama", "History"],
    director: {
      name: "Steven Spielberg",
      bio: "Steven Allan Spielberg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.",
      born: new Date("1946-12-18"),
      died: "--"
    },
    featured: true,
    stars: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    imageurl:"https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    description: "'The Lord of the Rings: The Return of the King' is an epic fantasy film directed by Peter Jackson. It concludes the epic trilogy as Frodo and Sam continue their quest to destroy the One Ring, leading to an epic battle for the fate of Middle-earth. The film received critical acclaim, winning numerous Academy Awards, including Best Picture.",
    year: 2003,
    genre: ["Action", "Adventure", "Drama"],
    director: {
      name: "Peter Jackson",
      bio: "Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien. ",
      born: new Date("1961-10-31"),
      died: "--"
    },
    featured: true,
    stars: ["Elija Wood", "Viggo Mortensen", "Ian McKellen"],
    imageurl:"https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
  },
  {
    title: "Pulp Fiction",
    description: "'Pulp Fiction' is a groundbreaking crime film directed by Quentin Tarantino. With a nonlinear narrative, it weaves interconnected stories of hitmen, boxers, and mobsters in Los Angeles. Known for its sharp dialogue, eclectic soundtrack, and memorable characters, the film is a cultural phenomenon that redefined modern cinema.",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: {
      name: "Quentin Tarantino",
      bio: "Quentin Jerome Tarantino is an American film director, screenwriter, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
      born: new Date("1963-03-27"),
      died: "--"
    },
    featured: true,
    stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    imageurl:"https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "'The Lord of the Rings: The Fellowship of the Ring' is a fantasy epic directed by Peter Jackson. It follows the journey of Frodo Baggins and the Fellowship as they seek to destroy the One Ring to prevent the dark lord Sauron`s return. Filled with breathtaking visuals, compelling characters, and a richly detailed world, the film is the first installment in the iconic 'Lord of the Rings' trilogy.",
    year: 2001,
    genre: ["Action", "Adventure", "Drama"],
    director: {
      name: "Peter Jackson",
      bio: "ir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien. ",
      born: new Date("1961-10-31"),
      died: "--"
    },
    featured: true,
    stars: ["Elija Wood", "Ian McKellen", "Orlando Bloom"],
    imageurl:"https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i",
  },
  {
    title: "The Good, the Bad and the Ugly",
    description: "'The Good, the Bad and the Ugly' is a classic spaghetti western directed by Sergio Leone. Set during the American Civil War, it follows three morally ambiguous gunslingers—Blondie (the Good), Angel Eyes (the Bad), and Tuco (the Ugly)—as they search for buried treasure. Known for its iconic score, intense shootouts, and epic landscapes, the film is a quintessential example of the genre.",
    year: 1966,
    genre: ["Adventure", "Western"],
    director: {
      name: "Sergio Leone",
      bio: "Sergio Leone was an Italian film director, producer, and screenwriter, credited as the pioneer of the spaghetti Western genre. He is widely regarded as one of the most influential directors in the history of cinema. Leone's film-making style includes juxtaposing extreme close-up shots with lengthy long shots.",
      born: new Date("1929-01-03"),
      died: new Date("1989-04-30"),
    },
    featured: true,
    stars: ["Clint Eastwood", "Eli Wallach", "Lee Van Cleef"],
    imageurl:"https://www.imdb.com/title/tt0060196/mediaviewer/rm1383786241/?ref_=tt_ov_i",
  },
];


var usersList = [
  {
    username: "john_doe",
    password: "password123",
    email: "john.doe@example.com",
    birthdate: new Date("1990-05-15"),
    favoritemovies: [
      ObjectId('656eb0c49e9c9fe563d8ccce'),
      ObjectId('656eb0c49e9c9fe563d8ccd1'),
      ObjectId('656eb0c49e9c9fe563d8ccd5')
    ]
  },
  {
    username: "jane_smith",
    password: "qwerty456",
    email: "jane.smith@example.com",
    birthdate: new Date("1985-08-22"),
    favoritemovies: [
      ObjectId('656eb0c49e9c9fe563d8ccd6'),
      ObjectId('656eb0c49e9c9fe563d8cccf'),
      ObjectId('656eb0c49e9c9fe563d8ccd1')
    ]
  },
  {
    username: "bob_jenkins",
    password: "pass123",
    email: "bob.jenkins@example.com",
    birthdate: new Date("1995-03-10"),
    favoritemovies: [
      ObjectId('656eb0c49e9c9fe563d8ccd2'),
      ObjectId('656eb0c49e9c9fe563d8ccd0'),
      ObjectId('656eb0c49e9c9fe563d8ccd5')
    ]
  },
  {
    username: "alice_smith",
    password: "alicepass",
    email: "alice.smith@example.com",
    birthdate: new Date("1992-11-30"),
    favoritemovies: [
        ObjectId('656eb0c49e9c9fe563d8ccd3'),
        ObjectId('656eb0c49e9c9fe563d8cccf'),
        ObjectId('656eb0c49e9c9fe563d8ccd6')
      ]
  },
  {
    username: "sam_jackson",
    password: "sam123",
    email: "sam.jackson@example.com",
    birthdate: new Date("1988-07-05"),
    favoritemovies: [
      ObjectId('656eb0c49e9c9fe563d8ccd7'),
      ObjectId('656eb0c49e9c9fe563d8ccd2'),
      ObjectId('656eb0c49e9c9fe563d8ccd0')
    ]
  },
  {
    username: "emily_white",
    password: "emilypass",
    email: "emily.white@example.com",
    birthdate: new Date("1998-02-18"),
    favoritemovies: [
      ObjectId('656eb0c49e9c9fe563d8ccd2'),
      ObjectId('656eb0c49e9c9fe563d8cccf'),
      ObjectId('656eb0c49e9c9fe563d8ccd6')
    ]
  }
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