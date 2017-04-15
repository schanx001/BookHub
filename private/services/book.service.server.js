module.exports=function (app,smtpTransport,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);
    app.delete("/api/book",deleteBook);
    app.put("/api/book",updateBook);
    app.get("/api/getbooks",getAllBooks);


    var bookModel = model.bookModel;
    var userModel = model.userModel;


    function getAllBooks(req,res) {
        bookModel
            .findAllBooks()
            .then(function (books) {

                res.json(books);
            },function (err) {
                res.sendStatus(404).send(err);
            })
    }


    function sendRequestMailToUser(bookName,emailId){
        var subjectText="";
        var bodyText="";
            subjectText="BookHub: You have a book share request";
            bodyText='Greetings! User,\n\nYour book named "'+bookName+'" has been requested by a BookHub user.\n\nRegards,\nTeam BookHub';
        var mailOptions={
            to : emailId,
            subject : subjectText,
            text : bodyText
        };
        // console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                // console.log(error);
                // res.end("error");
            }else{
                // console.log("Message sent: " + response.message);
                // res.end("sent");
            }
        });
    };

    function sendAcceptMailToUser(book,status){
        var subjectText="";
        var bodyText="";
        if(status){
            subjectText="BookHub: Book request accepted";
            bodyText='Greetings! User,\n\nYour request for book named "'+book.title+'" has been accepted\n\nRegards,\nTeam BookHub';
        }else{
            subjectText="BookHub: Book request rejected";
            bodyText='Greetings! User,\n\nYour request for book named "'+book.title+'" has been rejected\n\nRegards,\nTeam BookHub';
        }
        var mailOptions={
            to : book.email,
            subject : subjectText,
            text : bodyText
        };
        // console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                // console.log(error);
                // res.end("error");
            }else{
                // console.log("Message sent: " + response.message);
                // res.end("sent");
            }
        });
    };





    function updateBook(req,res) {
        // console.log("ffe="+req.body);
        var book=req.body;
        var userId=req.query.userId;
        var requestBookId=req.query.requestBook;
        var bookReturned=req.query.bookReturned;
        if(bookReturned!=undefined){
            var book=req.body;
            bookModel
                .updateBookReturnStatus(book)
                .then(function (response) {
                    res.sendStatus(200);
                },function () {
                    res.status(404).send();
                });
        }else if(requestBookId!=undefined){
            // console.log("updated="+requestBookId);
            var requestorId=req.query.requestorId;
            bookModel
                .updateBookRequestorInDb(requestBookId,requestorId)
                .then(function (responseNew) {
                    // console.log("updated="+responseNew.title);
                    userModel
                        .getEmailIdFromUserIds([responseNew.owner])
                        .then(function (response) {
                            sendRequestMailToUser(responseNew.title,response[0].email);
                        },function (error) {
                            res.status(404).send();
                        });
                    res.sendStatus(200);
                },function (error) {
                    res.status(404).send();
                });
        }else if((userId!=null && userId!=undefined)){
            // console.log(userId);
            bookModel
                .updateBookInDb(book)
                .then(function (response) {
                    res.sendStatus(200);
                },function (error) {
                    res.status(404).send();
                });
        }else{
            var acceptRequest=req.query.acceptRequest;
            // console.log(acceptRequest);
            if(acceptRequest==="1"){
                // console.log("Inside");
                book.status="shared";
                // console.log("accept"+book);
                bookModel
                    .updateBookInDb(book)
                    .then(function (response) {
                        sendAcceptMailToUser(book,true);
                        res.sendStatus(200);
                    },function (error) {
                        res.status(404).send();
                    });
            }else{
                book.status="available";
                book.currentlyWith=book.owner;
                // console.log(book);
                bookModel
                    .updateBookInDb(book)
                    .then(function (response) {
                        sendAcceptMailToUser(book,false);
                        res.sendStatus(200);
                    },function (error) {
                        res.status(404).send();
                    });
            }
        }
    }

    function deleteBook(req,res) {
        var bookId=req.query.bookId;
        bookModel
            .deleteBookFromDb(bookId)
            .then(function (response) {
                findBooks(req,res);
            },function (error) {
                res.status(404).send();
            });
    }

    function createBook(req,res) {
        var book=req.body;
        bookModel
            .createABook(book)
            .then(function (response) {
                res.send(response);
            },function (error) {
                res.status(404).send();
            })
    }
    
    function findBooks(req,res) {
        var bookName=req.query.bookName;
        var userId=req.query.userId;
        var bookId=req.query.bookId;
        if(bookId!=undefined){
            bookModel
                .findBookByIdInDb(bookId)
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.status(404).send();
                });
        }else if(bookName){
            bookModel
                .findBooksByName(bookName)
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.status(404).send();
                })
        }else if(userId){
            bookModel
                .findBooksOwnedAndBorrowedByUserId(userId)
                .then(function (response) {
                    var newUserIds=[];
                    for(var x in response){
                        var userobj=response[x];
                        if(userobj.currentlyWith!=userId){
                            newUserIds.push(userobj.currentlyWith);
                        }
                        else if(userobj.owner!=userId){
                            newUserIds.push(userobj.owner);
                        }
                    }
                    userModel
                        .getEmailIdFromUserIds(newUserIds)
                        .then(function (responseNew) {
                            var finalResponse=[];
                            if(!responseNew.length){
                                finalResponse=response;
                            }
                            for(var x in responseNew){
                                var newUser=responseNew[x];
                                for(var y in response){
                                    var oldUser=response[y].toObject();
                                    if(oldUser.owner.toString()===newUser._id.toString() || oldUser.currentlyWith.toString()===newUser._id.toString()){
                                        oldUser.username=newUser.username;
                                        oldUser.email=newUser.email;
                                    }
                                    finalResponse.push(oldUser);
                                }
                            }
                            res.send(finalResponse);
                        },function (error) {
                            res.status(404).send();
                        });
                },function (error) {
                    res.status(404).send();
                });
        }
        else{
            bookModel
                .findAllAvBooks()
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.status(404).send();
                })
        }
    }
};
