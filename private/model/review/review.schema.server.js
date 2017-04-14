module.exports = function(model) {
    var mongoose = require('mongoose');
    var reviewSchema = mongoose.Schema({
        bookId: {type:mongoose.Schema.Types.ObjectId,ref:'bookModel'},
        commentor: "String",
        comment: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project.mongo.reviews'});

    return reviewSchema;
};

