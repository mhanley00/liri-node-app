require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var moment = require('moment');
var Spotify = require('node-spotify-api');

moment().format();
var omdb = (keys.omdb.id);
var bit = (keys.bit.id);

var PORT = 8080;
var spotify = new Spotify(keys.spotify);


function liriSearch() {
    var nodeArgs = process.argv[2];
    switch (nodeArgs) {
        case "spotify-this-song":
        spotifyThis();
        break;
        case "movie-this":
        movieThis();
        break;
        case "concert-this":
        concertThis();
        break;
        // case "do-what-it-says":
        // iWantItThatWay();
        // break; //need spotify set up to do this
    }
}


function spotifyThis() {
    var song = process.argv[3];
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var albumData = data.tracks.items; //tracks.items[0]
        //    console.log(albumData); 
        albumData.forEach(function (external_urls) {
            console.log(`PREVIEW: ${external_urls.preview_url}`)
            albumData.forEach(function (album) {
                console.log(`Album Name: ${album.album.name}`)
                album.artists.forEach(function (artist) {
                    console.log(`Artist Name: ${artist.name}`);
                }); //end offorEach
            })
        })
    });
}


function movieThis() {
    var movie = process.argv[3];
    // if (movie == ""){
    //     movie = "Mr. Nobody";
    //     console.log("the movie: "+ movie);

    // }
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
            console.log("Date: " + moment(jsonData[0].datetime).format('MM/DD/YYYY'));
            
        }
    })
}
liriSearch();
