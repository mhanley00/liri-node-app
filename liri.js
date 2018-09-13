require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

// var Spotify = require('node-spotify-api');

// Set our port to 8080
var PORT = 8080;
// var spotify = new Spotify(keys.spotify);
var omdb = (keys.OMDB);
// var bit = (keys.BIT);
// spotify.search({ type: 'track', 
// query: 'All the Small Things' }, 
// function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data.tracks.items[0]); //tracks.items[0]
//   });

//   2. `node liri.js spotify-this-song '<song name here>'`
//   * This will show the following information about the song in your terminal/bash window
//     * Artist(s)    
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from
//   * If no song is provided then your program will default to "The Sign" by Ace of Base.
//${data.tracks.items[i]}


var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = ""; //or make one for each term ie var song var band
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
  
      movieName = movieName + "+" + nodeArgs[i];
  
    }
  
    else {
  
      movieName += nodeArgs[i];
  
    }
  }
  
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  request(queryUrl, function(error, res, body) {
  
    // If the request is successful
    if (!error && res.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });