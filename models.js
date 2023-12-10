const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, 
            required: true,
    },
    Description: {
        type: String,
    },
    Year: {
        type: Number,
    },
    Genre: {
        Name: String,
        Description: String,
    },
    Director: {
        Name: String,
        Bio: String,
        Born: {
            type: Date,
            default: "--",
        },
        Died: {
            type: Date,
            default: "--",
        },
    },
    Featured: Boolean,
    Stars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Star',
    }],
    ImagePath: String,
    Featured: Boolean,
    ImageURL: String,
});

let userSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }, 
    Email: {
        type: String,
        required: true,
    },
    Birthdate: Date,
    FavoriteMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    }]
});

let starSchema = mongoose.Schema({
    Name: String,
    Birthdate: {
        type: Date,
        default: "--",
    },
    Deathdate: {
        type: Date,
        default: "--",
    },
    Biography: String,
})

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Star = mongoose.model('Star', starSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Star = Star;