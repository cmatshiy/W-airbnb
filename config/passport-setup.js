const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../module/user-module');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById().then((user) => {
    done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
// i check if user already exist in my database.
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser){
                // i already have the user.
                console.log('user is:', currentUser);
                done(null, currentUser);
            } else {
                //if not: i create my new user if user is not in the database.
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created:' + newUser);
                    done(null,newUser);
                });
            }
        })
    })
)