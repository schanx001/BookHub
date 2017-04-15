module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var bookSchema ;//= require('./user.schema.server.js')();
    var bookModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "setModel":setModel,
        "getModel":getModel,
        "createABook":createABook,
        "updateABook":updateABook,
        "findAllAvBooks":findAllAvBooks,
        "findBooksByName":findBooksByName,
        "deleteBookFromDb":deleteBookFromDb,
        "updateBookInDb":updateBookInDb,
        "findBooksOwnedAndBorrowedByUserId":findBooksOwnedAndBorrowedByUserId,
        "updateBookRequestorInDb":updateBookRequestorInDb,
        "updateBookReturnStatus":updateBookReturnStatus,
        "findBookByIdInDb":findBookByIdInDb,
        "deleteBooksForUserId":deleteBooksForUserId,
	    "findAllBooks":findAllBooks

    };
    return api;

    function findAllBooks() {
        return bookModel.find({_id:{$ne:null}});
    }


    function deleteBooksForUserId(userId) {
        return bookModel.remove({owner:userId});
    }


    function findBookByIdInDb(bookId) {
        return bookModel.findById({_id:bookId});
    }

    function updateBookReturnStatus(book) {
        return bookModel.update({_id:book._id},{$set:{currentlyWith:book.owner,status:"available"}});
    }

    function updateBookRequestorInDb(bookId,requestorId) {
        return bookModel.findOneAndUpdate({_id:bookId},{$set:{currentlyWith:requestorId,status:"requested"}});
    }

    function updateBookInDb(book) {
        return bookModel.update({_id:book._id},{$set:book});
    }

    function getModel() {
        return bookModel;
    }

    function  setModel(_model){
        model=_model;
        bookSchema = require("./book.schema.server")(model);
        bookModel = mongoose.model("bookModel", bookSchema);
    }

    function deleteBookFromDb(bookId) {
        return bookModel.remove({_id:bookId});
    }

    function createABook(book) {
        return bookModel.create(book);
    }

    function updateABook(book) {
        return bookModel.update({_id:book._id},{$set:book});
    }

    function findAllAvBooks() {
        return bookModel.find({status:"available"}).sort({"dateCreated":-1});
    }

    function findBooksByName(bookName) {
        return bookModel.find({title: { "$regex": bookName, "$options": "i" }},function(err,docs) {
        });
    }
    function findBooksOwnedAndBorrowedByUserId(userId) {
        return bookModel.find({ $or:[ {owner:userId}, {currentlyWith:userId} ]},function (err,docs) {
        });
    }
};
