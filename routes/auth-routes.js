const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout',(req, res) =>{
    //im handling with passport js
    res.send('logging out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req,res)=> {
    // res.send(req.user);
     res.redirect('/final-booking');
});

module.exports = router;