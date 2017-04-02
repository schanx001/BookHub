module.exports=function (app,model) {
    app.get("/api/book",findBooks);
    app.post("/api/book",createBook);

    var bookModel = model.bookModel;

    function createBook(req,res) {
        console.log("inside create");
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
       bookModel
           .findAllAvBooks()
           .then(function (response) {
               res.send(response);
           },function (error) {
               res.status(404).send();
           })
    }
};
