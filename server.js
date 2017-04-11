var express = require('express');
var nodemailer = require("nodemailer");
var app = express();

//passport js implementation

var passport  = require('passport');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv')

dotenv.load();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'thisissecret',
    resave: true,
    saveUninitialized: true
}));

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "webdevproject2017@gmail.com",
        pass: "webdev123"
    }
});


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./private/app.js")(app,smtpTransport);

//require ("./test/app.js")(app);

//require("./private/app.js")(app);

/*
 Here we are configuring our SMTP Server details.
 STMP is mail server which is responsible for sending and recieving email.
 */
/*------------------SMTP Over-----------------------------*/


var port = process.env.PORT || 3001;

app.listen(port);