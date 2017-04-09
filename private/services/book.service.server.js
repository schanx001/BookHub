module.exports=function (app,smtpTransport,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);
    app.delete("/api/book",deleteBook);
    app.put("/api/book",updateBook);


    var bookModel = model.bookModel;
    var userModel = model.userModel;


    function sendMailToUser(book,status){
        var subjectText="";
        var bodyText="";
        if(status){
            subjectText="BookHub: Book request accepted";
            bodyText="Your request for book named "+book.title+" has been accepted\n\nRegards,\nTeam BookHub";
        }else{
            subjectText="BookHub: Book request rejected";
            bodyText='Your request for book named "'+book.title+'" has been rejected\n\nRegards,\nTeam BookHub';
        }
        var mailOptions={
            to : book.email,
            subject : subjectText,
            text : bodyText
        };
        console.log(mailOptions);
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
        var book=req.body;
        var userId=req.query.userId;
        if(userId!=null || userId!=undefined){
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
                        sendMailToUser(book,true);
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
                        sendMailToUser(book,false);
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
        if(bookName){
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
                        .getEmailIFromUserIds(newUserIds)
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
