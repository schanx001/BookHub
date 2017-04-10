var express = require('express');
var nodemailer = require("nodemailer");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

/*
 Here we are configuring our SMTP Server details.
 STMP is mail server which is responsible for sending and recieving email.
 */
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "webdevproject2017@gmail.com",
        pass: "webdev123"
    }
});


require("./private/app.js")(app,smtpTransport);
var port = process.env.PORT || 3001;

app.listen(port);