const express = require('express')
const app = express()
const port = process.env.PORT
const passport = require('passport')
const SteamStrategy = require('passport-steam');

passport.use(new SteamStrategy({
    returnURL: 'https://steam-passport.herokuapp.com/auth/steam/return',
    realm: 'https://steam-passport.herokuapp.com/',
    apiKey: process.env.API_KEY
  },
  function(identifier, profile, done) {
    console.log(profile)
  }
));

app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
