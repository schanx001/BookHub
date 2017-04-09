var express = require('express');
var app = express();

//passport js implementation

var passport  = require('passport');
var cookieParser  = require('cookie-parser');
var session = require('express-session');


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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//require ("./test/app.js")(app);

require("./private/app.js")(app);

var port = process.env.PORT || 3001;

app.listen(port);