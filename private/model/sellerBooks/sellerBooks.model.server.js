module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var sellerBooksSchema ;//= require('./user.schema.server.js')();
    var sellerBooksModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "setModel":setModel,
        "getModel":getModel,
        "createABook":createABook,
        "updateABook":updateABook,
        "findAllBooks":findAllBooks,
        "findBooksByName":findBooksByName,
        "deleteBookFromDb":deleteBookFromDb,
        "updateBookInDb":updateBookInDb,
        "findBooksBySellerId":findBooksBySellerId,
        "findSellerBookById":findSellerBookById,
        "deleteSellerBooksForUserId":deleteSellerBooksForUserId
        //"updateBookRequestorInDb":updateBookRequestorInDb
    };
    return api;

    function deleteSellerBooksForUserId(sellerIds) {
        return sellerBooksModel.remove({owner:sellerIds});
    }

    // function updateBookRequestorInDb(bookId,requestorId) {
    //     return bookModel.findOneAndUpdate({_id:bookId},{$set:{currentlyWith:requestorId,status:"requested"}});
    // }

    function findSellerBookById(sellerBookId) {
        return sellerBooksModel.findById(sellerBookId);
    }
    function updateBookInDb(book) {
        return sellerBooksModel.update({_id:book._id},{$set:book});
    }

    function getModel() {
        return sellerBooksModel;
    }

    function  setModel(_model){
        model=_model;
        sellerBooksSchema = require("./sellerBooks.schema.server")(model);
        sellerBooksModel = mongoose.model("sellerBooksModel", sellerBooksSchema);
    }

    function deleteBookFromDb(bookId) {
        return sellerBooksModel.remove({_id:bookId});
    }

    function createABook(book) {
        // console.log(book);
        return sellerBooksModel.create(book);
    }

    function updateABook(book) {
        return sellerBooksModel.update({_id:book._id},{$set:book});
    }

    function findAllBooks() {
        return sellerBooksModel.find().sort({"dateCreated":-1});
    }

    function findBooksByName(bookName) {
        return sellerBooksModel.find({title: { "$regex": bookName, "$options": "i" }},function(err,docs) {
        });
    }
    function findBooksBySellerId(sellerId) {
        return sellerBooksModel.find({owner:sellerId},function (err,docs) {
        });
    }
};