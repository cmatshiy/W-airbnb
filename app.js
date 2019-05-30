const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//const User = require('./module/user-module');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const api = require('./api');

const app = express();

//set public folder

//setting up my view engine
app.set('view engine','ejs');
app.use('/public', express.static('public'))


app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }); () => {
    console.log('connected to mongodb');
};

// mongoose.connect('mongodb:localhost:3000/landlords',  { useNewUrlParser: true });

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/profile', (req, res) =>{
    res.render('profile');
});

app.get('/indexC', (req, res) =>{
    res.render('indexC');
});

app.get('/landlord-profile', (req, res) =>{
    res.render('landlord-profile');
});

app.get('/tenant-profile', (req, res) =>{
    res.render('tenant-profile');
});

app.get('/hybrid-profile', (req, res) =>{
    res.render('hybrid-profile');
});

app.get('/final-booking', (req, res) =>{
    res.render('final-booking');
});

app.get('/homepage', (req, res) =>{
    res.render('homepage');
});

app.get('/home', (req, res) =>{
    res.render('home', {user: req.user});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/', (req,res) => {
    res.render('index');
});
app.get('/about_us', (req,res) => {
    res.render('about_us');
});
app.get('/our_rooms', (req,res) => {
    res.render('our_rooms');
});

app.get('/mongo_file_upload', (req,res) => {
    res.render('mongo_file_upload');
});

app.get('/css', (req,res) => {
    res.render('css');
});

app.get('/booking', (req,res) => {
    res.render('booking');
});

app.get('/profile', (req,res) => {
    res.render('profile');
});

app.get('/payment_form',(req,res) =>{
    res.render('payment_form');
});

app.get('/contact_us', (req,res) => {
    res.render('contact_us');
});

app.get('/chat', (req,res) => {
    res.render('chat');
});

app.get('/house-upload', (req,res) => {
    res.render('house-upload');
});

app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('localhost:3000/user')
    .then(response => {
        console.log(res.json(response))
    })
    .catch(error => {
        res.send(error)
    })
})

// mongoose.connect(config.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Database connection established");
// }).catch(e => {
//     console.log("Error: ", e);
//     process.exit();
// });

app.listen(3000,() => {
    console.log('app now listen for requests on port 3000');
});