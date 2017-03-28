/**
 * Created by schanx on 3/27/17.
 */
module.exports = function(model) {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        //websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'project.mongo.users'});

    return userSchema;
};