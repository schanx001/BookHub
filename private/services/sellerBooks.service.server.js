/**
 * Created by shohitbajaj on 12/04/17.
 */

module.exports=function (app,model) {
    app.get("/api/sellerbook",findBooks);
    app.post("/api/sellerbook",createBook);
    app.delete("/api/sellerbook",deleteBook);
    app.put("/api/sellerbook",updateBook);


    var sellerBooksModel = model.sellerBooksModel;
    var userModel = model.userModel;

    var sellerModel= model.sellerModel;
    

    function updateBook(req,res) {
        // console.log("ffe="+req.body);
        var book=req.body;
        var userId=req.query.userId;
        var requestBookId=req.query.requestBook;
        if(requestBookId!=undefined){
            // console.log("updated="+requestBookId);
            var requestorId=req.query.requestorId;
            sellerBooksModel
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
            sellerBooksModel
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
                sellerBooksModel
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
                sellerBooksModel
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
        sellerBooksModel
            .deleteBookFromDb(bookId)
            .then(function (response) {
                findBooks(req,res);
            },function (error) {
                res.status(404).send();
            });
    }

    function createBook(req,res) {
        var book=req.body;
        sellerBooksModel
            .createABook(book)
            .then(function (response) {
                res.send(response);
            },function (error) {
                res.status(404).send();
            })
    }

    function findBooks(req,res) {
        var sellerBookId=req.query.sellerBookId;
        var bookName=req.query.bookName;
        var userId=req.query.userId;
        if(sellerBookId != undefined){
            sellerBooksModel.findSellerBookById(sellerBookId)
                .then(function (response) {
                    sellerModel.findShopBySellerIdInDb(response.owner)
                        .then(function (responseNew) {
                            var output=response.toObject();
                            output.shopName=responseNew.shopName;
                            output.shopLocation=responseNew.shopLocation;
                            output.shopEmail=responseNew.shopEmail;
                            output.shopPhone=responseNew.shopPhone;
                            res.send(output);
                        },function (err) {
                            res.sendStatus(404);
                        })
                },function (err) {
                    res.sendStatus(404);
                })
        }
        else if(bookName){
            sellerBooksModel
                .findBooksByName(bookName)
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.status(404).send();
                })
        }else if(userId){
            sellerBooksModel
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
            sellerBooksModel
                .findAllBooks()
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.status(404).send();
                })
        }
    }
};
