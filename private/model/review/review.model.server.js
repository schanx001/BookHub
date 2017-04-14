module.exports = function() {

    var model = null;
    var mongoose = require("mongoose");
    var reviewSchema;//= require('./user.schema.server.js')();
    var reviewModel;//= mongoose.model('userModel',userSchema);

    var api = {
        "setModel":setModel,
        "getModel":getModel,
        "findReviewsByBookIdInDb":findReviewsByBookIdInDb,
        "findReviewsByUserNameInDb":findReviewsByUserNameInDb,
        "createReviewInDb":createReviewInDb
    };
    return api;

    function createReviewInDb(review) {
        return reviewModel.create(review);
    }

    function findReviewsByUserNameInDb(username) {
        return reviewModel.find({commentor:username}).sort({"dateCreated":-1});
    }

    function findReviewsByBookIdInDb(bookId) {
        return reviewModel.find({bookId:bookId}).sort({"dateCreated":-1});
    }

    function getModel() {
        return reviewModel;
    }

    function  setModel(_model){
        model=_model;
        reviewSchema = require("./review.schema.server")(model);
        reviewModel = mongoose.model("reviewModel", reviewSchema);
    }
};
