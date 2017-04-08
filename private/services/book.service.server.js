module.exports=function (app,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);

    var bookModel = model.bookModel;
    var userModel = model.userModel;

    function createBook(req,res) {
        // console.log("inside create");
        var book=req.body;
        bookModel
            .createABook(book)
            .then(function (response) {
                // console.log(response);
                // response.currentlyWith=response._id;
                // bookModel
                //     .updateABook(response)
                //     .then(function (response) {
                //         res.send(response);
                //     },function (error) {
                //         res.status(404).send();
                //     });
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
                    // console.log(response);
                    // console.log("before:   "+response);
                    // console.log("after:   "+response.toArray());
                    var newUserIds=[];
                    for(var x in response){
                        // console.log("before:   "+response[x]);
                        // console.log("after:   "+response[x].toJSON());
                        var userobj=response[x];
                        if(userobj.currentlyWith!=userId){
                            newUserIds.push(userobj.currentlyWith);
                        }
                        else if(userobj.owner!=userId){
                            newUserIds.push(userobj.owner);
                        }
                    }
                    // console.log("newUserIds="+newUserIds);
                    userModel
                        .getEmailIFromUserIds(newUserIds)
                        .then(function (responseNew) {
                            // console.log(responseNew);
                            var finalResponse=[];
                            for(var x in responseNew){
                                var newUser=responseNew[x];
                                for(var y in response){
                                    var oldUser=response[y].toObject();
                                    // oldUser.blah="sdsada";
                                    // oldUser.set("blah","safdas");
                                    // console.log("book:"+oldUser);
                                    // console.log("oldUser.owner="+oldUser.owner+" newUser._id="+newUser._id+" oldUser.currentlyWith="+oldUser.currentlyWith);
                                    // if(oldUser.owner==newUser._id){
                                    //     console.log("inside");
                                    // }
                                    // if(oldUser.currentlyWith.toString()==newUser._id){
                                    //     console.log("inside");
                                    // }
                                    if(oldUser.owner.toString()===newUser._id.toString() || oldUser.currentlyWith.toString()===newUser._id.toString()){
                                        // console.log("inside");
                                        oldUser.username=newUser.username;
                                        oldUser.email=newUser.email;
                                    }
                                    // console.log(oldUser.owner+"   "+newUser.id);
                                    // oldUser.set("blah","xfgdfg");
                                    // oldUser.blah="asdas";
                                    // oldUser.price=1000;
                                    // console.log(oldUser.blah);
                                    finalResponse.push(oldUser);
                                }
                            }
                            // console.log("response:"+finalResponse[0].price);
                            res.send(finalResponse);
                        },function (error) {
                            res.status(404).send();
                        });
                    // res.send(response);
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
