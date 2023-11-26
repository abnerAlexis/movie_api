const express = require('express'),
  morgan = require('morgan'),
  //Importing built-in node modules fs and path.
  fs = require('fs'),
  path = require('path');

const app = express();

//creating a write stream in append mode, and a txt file in root dir.
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to the movie app!');
});

http://localhost:8080/public/documentation.html
app.get('/document', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});