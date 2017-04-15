module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var userSchema ;//= require('./user.schema.server.js')();
    var userModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "createUser":createUser,
        "updateUser": updateUser,
        "findUserByCredentials": findUserByCredentials,
        "findUserById": findUserById,
        "findOneUserByUsername": findOneUserByUsername,
        "deleteUser":deleteUser,
        "setModel":setModel,
        "getModel":getModel,
        "getEmailIdFromUserIds":getEmailIdFromUserIds,
        "findUserByFacebookId":findUserByFacebookId,
        "findUserByGoogleId": findUserByGoogleId,
        "findAllUsers": findAllUsers,
        "updateUserRatingInDb":updateUserRatingInDb
    };
    return api;


    function updateUserRatingInDb(userId,bookId,rating) {
        return userModel.update({_id:userId},{$addToSet:{booksRated:{bookId:bookId,rating:rating}}});
    }
    function findAllUsers() {
        return userModel.find({role:{$nin:['admin']}});
    }
    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }
    
    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id':facebookId});
    }
    
    function getModel() {
        return userModel;
    }
    function createUser(user){
        return userModel.create(user);
    }

    function getEmailIdFromUserIds(userIds){
        return userModel.find({_id:{$in:userIds}},{username:1,email:1});
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }
    function findOneUserByUsername(username){
        // console.log('bye'+userModel.findOne({"username": username}));
        return userModel.findOne({"username": username});
    }
    function findUserByCredentials(_username,_password){
        return userModel.find({username:_username,password:_password});
    }

    function updateUser(userId, updatedUser){
        return userModel.update({_id:userId},{$set:updatedUser});
    }

    function deleteUser(userId){
        return userModel.findByIdAndRemove(userId, function (err,user) {
            if(user!=null){
                user.remove();
            }
        });
    }

    function  setModel(_model){
        model=_model;
        userSchema = require("./user.schema.server")(model);
        userModel = mongoose.model("userModel", userSchema);
    }
};
