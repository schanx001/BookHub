/**
 * Created by schanx on 3/27/17.
 */
module.exports = function(model) {
    var mongoose = require('mongoose');
    var sellerSchema = mongoose.Schema({
        owner:  [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
        shopName: String,
        shopLocation: String,
        mapPlace:Object,
        shopEmail: String,
        shopPhone: String,
    }, {collection: 'project.mongo.seller'});

    return sellerSchema;
};
