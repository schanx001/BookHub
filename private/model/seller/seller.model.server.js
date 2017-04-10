module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var sellerSchema ;//= require('./user.schema.server.js')();
    var sellerModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "addBook":addBook,
        "updateBook": updateBook,
        "findEventByEventId": findEventByEventId,
        "deleteEvent":deleteEvent,
        "setModel":setModel,
        "getModel":getModel
    };
    return api;

    function getModel() {
        return sellerModel;
    }
    function createEvent(event){
        return sellerModel.create(event);
    }

    function findEventByEventId(eventId){
        return sellerModel.findById(eventId);
    }

    function updateEvent(eventId, updatedEvent){
        return sellerModel.update({_id:userId},{$set:updatedEvent});
    }

    function deleteEvent(eventId){
        return sellerModel.findByIdAndRemove(eventId, function (err,event) {
            if(event!=null){
                event.remove();
            }
        });
    }

    function  setModel(_model){
        model=_model;
        sellerSchema = require("./seller.schema.server")(model);
        sellerModel = mongoose.model("sellerModelModel", sellerSchema);
    }
};