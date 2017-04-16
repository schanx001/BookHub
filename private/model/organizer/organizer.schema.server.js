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
        eventDate: String,
        eventTime: String,
        eventRSVP:[{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
        dateCreated: {type: Date, default:Date.now}
    }, {collection: 'project.mongo.event'});

    return organizerSchema;
};
