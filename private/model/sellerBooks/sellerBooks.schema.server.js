module.exports = function(model) {
    var mongoose = require('mongoose');
    var sellerBooksSchema = mongoose.Schema({
        owner: {type:mongoose.Schema.Types.ObjectId,ref:'sellerModel'},
        title: String,
        author: String,
        ISBN: String,
        imgsrc:String,
        imglrgsrc:String,
        description:String,
        rating: String,
        genre: String,
        price: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project.mongo.sellerBooks'});

    return sellerBooksSchema;
};
