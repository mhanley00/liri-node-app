require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var moment = require('moment');
moment().format();

// var Spotify = require('node-spotify-api');

// Set our port to 8080
var PORT = 8080;
// var spotify = new Spotify(keys.spotify);
var omdb = (keys.omdb.id);
var bit = (keys.bit.id);
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


function liriSearch() {
    var nodeArgs = process.argv[2];
    switch (nodeArgs) {
        case "movie-this":
        movieThis();
        break;
        case "concert-this":
        concertThis();
        break;
    }
}


function movieThis() {
    var movie = process.argv[3];
    // Then run a request to the OMDB API with the movie specified  
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdb;
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            if (!jsonData.Ratings[1]) {} else {
                console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value)
            };
            console.log("------------------------------------------------------------------");
        }
    });
}

function concertThis() {
    var band = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + bit;
    request(queryUrl, function (error, response, body){
        if (!error && response.statusCode === 200){
            var jsonData = JSON.parse(body);
            console.log("Venue: " + jsonData[0].venue.name);
            console.log("Location: " + jsonData[0].venue.city);
            console.log("Date: " + jsonData[0].datetime);
            // * DATE OF EVENT (use moment to format this as "MM/DD/YYYY")


            
        }
    })
}
liriSearch();




// * Date of the Event (use moment to format this as "MM/DD/YYYY")