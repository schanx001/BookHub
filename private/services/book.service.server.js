module.exports=function (app,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);

    var bookModel = model.bookModel;

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
                    res.send(response);
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
