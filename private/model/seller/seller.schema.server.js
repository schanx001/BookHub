/**
 * Created by schanx on 3/27/17.
 */
module.exports = function(model) {
    var mongoose = require('mongoose');
    var sellerSchema = mongoose.Schema({
        sellerId:  [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
        shopName: String,
        shopLocation: String,
        shopEmail: String,
        shopPhone: String,
        shopBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookModel'}]
    }, {collection: 'project.mongo.seller'});

    return sellerSchema;
};