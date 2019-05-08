const express = require('express');
const router = express.Router();

const passport = require('passport')
const User = require('../../models/User')


// @route       GET api/users/register
// @desc        Render the register page
// @access      Public
router.get('/register', (req,res) => {
    res.render('pages/register')
})


// @route       POST api/users/register
// @desc        Post request to registering the user
// @access      Public
router.post("/register", (req,res) => {
    User.register(new User({ username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('pages/register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/api/users/secret");
            //res.send("This is the secret page")
        });
    });
});

router.get("/login", (req,res) => {
    res.render("pages/login");
});

router.get('/logout' , (req,res) => {
    req.logout();
    res.redirect("/");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/api/users/secret",
    failureRedirect: "/api/users/login"
}), (req,res) => {
    console.log("Success")  
});

router.get('/default-page ', (req,res) => {
    res.send("This is working");
})

router.get("/secret", isLoggedIn, function (req, res) {
    //res.render("secret");
    res.send("This is the secret page")
    console.log("this is done after res.send")
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/api/users/login");
}

module.exports = router;