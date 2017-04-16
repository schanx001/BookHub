/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app, model) {


    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id','displayName','email','name']
    };
    
    passport.serializeUser(serializerUser);
    passport.deserializeUser(deserializeUser);

    // google oauth
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
            failureRedirect: '/#/login'
        }),function (req,res) {
            var url='/#/user/profile';//+req.user._id.toString();
            res.redirect(url);
        });

    app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
    app.get('/auth/facebook/callback',passport.authenticate('facebook',{
        failureRedirect: '/#/login'
    }),function (req,res) {
        var url = '/#/user/profile';//+req.user._id.toString();
        res.redirect(url);
    });
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.post("/api/users",getAllUsernames);
    app.post('/api/login',passport.authenticate('local'),login);
    app.post('/api/logout',logout);
    app.post('/api/register',register);
    app.get ('/api/loggedin', loggedin);
    app.get('/api/getusers',findUsers);



    function getAllUsernames(req,res) {
        userModel
            .getEmailIdFromUserIds(req.body)
            .then(function (response) {
                res.send(response);
            },function (error) {
                res.sendStatus(404);
            });
    }

    function findUsers(req,res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                //console.log(users);
                res.json(users);
            },function (err) {
                res.sendStatus(404).send(err);
            })
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@husky.neu.edu"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "bob@husky.neu.edu"},
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  ,email: "charly@husky.neu.edu"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jose@husky.neu.edu" }
    // ];
    var userModel = model.userModel;
    var bookModel=model.bookModel;
    var sellerBooksModel=model.sellerBooksModel;


    // facebook oauth

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig,facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if(user){
                    return done(null,user);
                }
                else{
                    var names=profile.displayName.split(" ");
                    var faceBookUser = {
                        firstName: names[0],
                        lastName: names[1],
                        facebook:{
                            id: profile.id,
                            token: token
                        },
                        email: profile.emails[0].value
                    };
                    userModel
                        .createUser(faceBookUser)
                        .then(function (user) {
                            done(null,user);
                        });
                }
            },function (err) {
                if(err) {
                    return done(err);
                }
            });
    }

    // google oauth



    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
            function (err) {
                if(err){
                    return done(err);
                }})
                .then(function (user) {
                    return done(null,user);
                },function (err) {
                    return done(err);
                });
    }


    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (User){
                if(User){
                    req.login(User, function (err) {
                        if(err){
                            res.status(400).send(err);
                        }
                        else{
                            res.json(User);
                        }
                    });
                }
            });
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function login(req, res) {

        // console.log("hi");

        var user=req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        userModel
            //.findUserByCredentials(username, password)
            .findOneUserByUsername(username)
            .then(function (user) {

                // console.log(user);
                // console.log(user.password + " "+ bcrypt.hashSync(password));
                // console.log(bcrypt.compareSync(password, user.password));
                if(user!=null && user.username === username && bcrypt.compareSync(password, user.password)){

                    return done(null,user);
                }else{
                    return done(null,false);
                }
            },function (err) {
                if(err){
                    return done(err);
                }
            });
    }

    function serializerUser(user, done) {
        done(null,user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(function (user) {
                done(null,user);
            },
            function (err) {
                done(err, null);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        bookModel
            .deleteBooksForUserId(userId)
            .then(function (response) {

                sellerBooksModel
                    .deleteSellerBooksForUserId(userId)
                    .then(function (response) {
                        userModel
                            .deleteUser(userId)
                            .then(
                                function (status) {
                                    res.sendStatus(200);
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    },function (error) {
                        res.sendStatus(404);
                    });


            },function (error) {
                res.sendStatus(404);
            });
    }

    function createUser(req, res) {

        // console.log("Create User called");
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        };

        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.send(newUser);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var rating=req.query.rating;
        if(rating!=undefined){
            var bookId=req.query.bookId;
            // console.log(userId+" "+bookId+" "+rating);
            userModel
                .updateUserRatingInDb(userId,bookId,rating)
                .then(function (response) {
                    // console.log("1"+response);
                    bookModel
                        .findBookByIdInDb(bookId)
                        .then(function (responseNew) {
                            // console.log("responseNew.averageRating="+responseNew.averageRating);
                            // console.log("responseNew.ratingCount="+responseNew.ratingCount);
                            // console.log(responseNew.averageRating*responseNew.ratingCount);
                            // console.log("2"+((responseNew.averageRating*responseNew.ratingCount)+rating));
                            responseNew.averageRating=(((responseNew.averageRating*responseNew.ratingCount)+ parseInt(rating))/(responseNew.ratingCount+1));
                            responseNew.ratingCount=responseNew.ratingCount+1;
                            // console.log("3"+responseNew);
                            bookModel
                                .updateBookInDb(responseNew)
                                .then(function (book) {
                                    // console.log("4"+book);
                                    res.send({averageRating:responseNew.averageRating,ratingCount:responseNew.ratingCount});
                                },function (error) {
                                    res.sendStatus(404);
                                });
                        });
                },function (error) {
                    res.send(404);
                });
        }else{
            var newUser = req.body;
            userModel
                .updateUser(userId, newUser)
                .then(function (response) {
                    //if (response.nModified === 1) {
                        userModel
                            .findUserById(userId)
                            .then(function (response) {
                                res.json(response);
                            }, function () {
                                res.sendStatus(404);
                            });
                   // }
                   //  else {
                   //      res.sendStatus(404);
                   //  }
                }, function () {
                    res.sendStatus(404);
                });
        }
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        //console.log("Find User called");
        var userId=req.query.userId;
        var bookId=req.query.bookId;
        if(userId!=undefined && bookId!=undefined){
            userModel
                .findUserById(userId)
                .then(function (user) {
                    var booksRated=user.booksRated;
                    for(var x in booksRated){
                        if(booksRated[x].bookId==bookId){
                            bookModel
                            res.send(booksRated[x].rating.toString());
                            return;
                        }
                    }
                    res.send("-1");
                },function (error) {
                    res.sendStatus(404);
                });
        }else{
            var username = req.query['username'];
            var password = req.query['password'];
            if (username && password) {
                findUserByCredentials(req, res);
            } else if (username) {
                //console.log(username);
                findUserByUsername(req, res);
            } else{
                    res.json(req.user);
            }
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
/*
    .then(function (user) {
            console.log("hi "+user);
            if (user) {

                res.json(user[0]);
            }
            else {

                console.log(username + '22');
                res.sendStatus(404);
            }
        },function (err) {
            console.log("in find userbyusername");
            res.sendStatus(404);
        });
*/

        userModel
            .findOneUserByUsername(username)
            .then(function (user) {
                // console.log("hi "+user);
                if (user) {

                    res.json(user[0]);
                }
                else {

                    // console.log(username + '22');
                    res.sendStatus(404);
                }
            },function (err) {
                // console.log("in find userbyusername");
                res.sendStatus(404);
            });
        /* .then(function (user){
                console.log('i'+user);
                res.send(user[0]);
            },function (err) {
                console.log('i'+err);
                res.sendStatus(404);
            });*/

    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if (response.length != 0) {
                    res.json(response[0])
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
};
