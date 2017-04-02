module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var bookSchema ;//= require('./user.schema.server.js')();
    var bookModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "setModel":setModel,
        "getModel":getModel,
        "createABook":createABook,
        "findAllAvBooks":findAllAvBooks,
        "findBooksByName":findBooksByName,
    };
    return api;

    function getModel() {
        return bookModel;
    }

    function  setModel(_model){
        model=_model;
        bookSchema = require("./book.schema.server")(model);
        bookModel = mongoose.model("bookModel", bookSchema);
    }

    function createABook(book) {
        console.log(book);
        return bookModel.create(book);
    }

    function findAllAvBooks() {
        return bookModel.find().sort({"dateCreated":-1});
    }

    function findBooksByName(bookName) {
        return bookModel.find({title: { "$regex": bookName, "$options": "i" }},function(err,docs) {
        });
    }
};