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
        booksRated:[{_id:false,bookId:{type:mongoose.Schema.Types.ObjectId,ref:'bookModel'},rating:Number}],
        role: {type: String, enum: ['admin','user','seller','eventorganizer'], default: 'user'},
        dateCreated: {type: Date, default:Date.now},
        facebook:{
            id:String,
            token:String
        },
        google: {
            id: String,
            token: String
        }
    }, {collection: 'project.mongo.users'});

    return userSchema;
};
