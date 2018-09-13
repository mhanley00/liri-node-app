require("dotenv").config();
var apiKeys = require("./keys.js");

// Set our port to 8080
var PORT = 8080;
var spotify = new Spotify(keys.spotify);
var omdb = new omdb(keys.OMDB);
var bit = new bit(keys.BIT);
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = ""; //or make one for each term ie var song var band

//FROM levelTwoOmdbInteractive.js, exercise 18
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
  
  request(queryUrl, function(error, response, body) {
  
    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });