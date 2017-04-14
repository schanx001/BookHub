module.exports = function (app) {

    var userModel = require("./user/user.model.server.js")();
    var bookModel = require("./book/book.model.server.js")();
    var organizerModel = require("./organizer/organizer.model.server.js")();
    var reviewModel = require("./review/review.model.server.js")();
    var sellerModel = require("./seller/seller.model.server.js")();
    var sellerBooksModel = require("./sellerBooks/sellerBooks.model.server.js")();

    var model= {
        userModel: userModel,
        bookModel:bookModel,
        organizerModel:organizerModel,
        reviewModel:reviewModel,
        sellerModel: sellerModel,
        sellerBooksModel: sellerBooksModel
    };

    userModel.setModel(model);
    bookModel.setModel(model);
    organizerModel.setModel(model);
    reviewModel.setModel(model);
    sellerModel.setModel(model);
    sellerBooksModel.setModel(model);
    return model;

};
