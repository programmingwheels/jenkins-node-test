'use strict';

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
        done();
    }));

};
