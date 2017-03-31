module.exports = function (app) {

    var userModel = require("./user/user.model.server.js")();
    var bookModel = require("./book/book.model.server.js")();
    var model= {
        userModel: userModel,
        bookModel:bookModel
    };

    userModel.setModel(model);
    bookModel.setModel(model);
    // bookModel
    //     .createBook({title:"book1",author:"author1",price:1,imgsrc:"link1"});
    return model;

};