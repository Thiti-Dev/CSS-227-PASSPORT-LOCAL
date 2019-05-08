const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');

//Ejs
app.set('view engine', 'ejs')
app.use(express.static("public"))

//Set the body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose - Connecting to the database
mongoose
    .connect('mongodb://localhost/lab07', { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(err => {
        console.log(err)
    })

//Mongoose - Loading the Schema
const User = require('./models/User')

//Passport
app.use(require("express-session")({
    secret: "I am IRON MAN",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req,res) => {
    res.render("pages/index");
})


//Loading route
const users = require('./routes/api/users');

//setting up the route
app.use('/api/users' , users);

app.listen(port, () => {
    console.log(`Server currently running on ${port}`)
})