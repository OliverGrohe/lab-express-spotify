require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

// Our routes go here:

app.get("/", (req, res, next) => {
    res.render("index.hbs");
  });

  app.get("/artist-search", (req, res, next) => {
      // get req.query
      // connect to API with artist name
      // render page with received info from API

      let searchArtist = req.query.fname

      spotifyApi
  .searchArtists(searchArtist)
  .then(data => {
    console.log('The received data from the API: ', data.body);
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render("artist-search-results.hbs", {search: data.body.artists.items});
  })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  });

  app.get('/albums/:artistId', (req, res, next) => {
    spotifyApi.getArtistAlbums()
    .then(() => {
        res.render("albums.hbs")
    })
    .catch(();) => {
        
    })
  });


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
