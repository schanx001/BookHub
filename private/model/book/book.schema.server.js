module.exports = function(model) {
    var mongoose = require('mongoose');
    var bookSchema = mongoose.Schema({
        owner: {type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
        title: String,
        author: String,
        imgsrc:String,
        imglrgsrc:String,
        description:String,
        currentlyWith: {type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
        averageRating: Number,
        ratingCount:Number,
        notes:String,
        genre: String,
        price: Number,
        status:String,//available,shared,requested
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'project.mongo.books'});

    return bookSchema;
};
