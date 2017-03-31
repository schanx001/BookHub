module.exports = function(model) {
    var mongoose = require('mongoose');
    var bookSchema = mongoose.Schema({
        owner: {type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
        title: String,
        author: String,
        ISBN: String,
        imgsrc:String,
        currentlyWith: String,
        rating: String,
        price: Number,
        status:String,//available,shared,pending
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project.mongo.books'});

    return bookSchema;
};
