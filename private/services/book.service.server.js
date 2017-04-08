module.exports=function (app,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);
    app.delete("/api/book",deleteBook);
    app.put("/api/book",updateBook);

    var bookModel = model.bookModel;
    var userModel = model.userModel;

    function updateBook(req,res) {
        var book=req.body;
        var userId=req.query.userId;
        // console.log(book);
        bookModel
            .updateBookInDb(book)
            .then(function (response) {
                res.sendStatus(200);
            },function (error) {
                res.status(404).send();
            });
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
