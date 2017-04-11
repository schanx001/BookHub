/**
 * Created by schanx on 3/27/17.
 */
module.exports = function(model) {
    var mongoose = require('mongoose');
    var organizerSchema = mongoose.Schema({
        owner:  [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
        eventName: String,
        eventDescription: String,
        eventLocation: String,
        eventDate: Date,
        eventTime: String,
        dateCreated: {type: Date, default:Date.now}
    }, {collection: 'project.mongo.event'});

    return organizerSchema;
};