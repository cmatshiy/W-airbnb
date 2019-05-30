const router = require('express').Router();

const authCheck = (req,res,next) => {
    if(req.User){
        //if user is not logged in i redirect them to login page.
        res.redirect('/auth/login');
    }else{
        //
        next();
    }
}

// router.get('/', (req,res) => {
//     res.send('you are logged in, this is your profile -' + req.user.username)
// });

router.post('/',authCheck,(req, res) => {
    res.render('/final-booking', {user: req.user});
});

module.exports = router;