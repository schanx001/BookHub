module.exports = function (app) {

    var userModel = require("./user/user.model.server.js")();
    var bookModel = require("./book/book.model.server.js")();
    var organizerModel = require("./organizer/organizer.model.server.js")();
    var sellerModel = require("./seller/seller.model.server.js")();

    var model= {
        userModel: userModel,
        bookModel:bookModel,
        organizerModel:organizerModel,
        sellerModel: sellerModel
    };

    userModel.setModel(model);
    bookModel.setModel(model);
    organizerModel.setModel(model);
    sellerModel.setModel(model);
    // bookModel
    //     .createBook({title:"book1",author:"author1",price:1,imgsrc:"link1"});
    return model;

};