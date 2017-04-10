module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var sellerSchema ;//= require('./user.schema.server.js')();
    var sellerModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "Event":createEvent,
        "updateEvent": updateEvent,
        "findEventByEventId": findEventByEventId,
        "deleteEvent":deleteEvent,
        "setModel":setModel,
        "getModel":getModel
    };
    return api;

    function getModel() {
        return organizerModel;
    }
    function createEvent(event){
        return organizerModel.create(event);
    }

    function findUserByEventId(eventId){
        return organizerModel.findById(eventId);
    }

    function updateEvent(eventId, updatedEvent){
        return organizerModel.update({_id:userId},{$set:updatedEvent});
    }

    function deleteEvent(eventId){
        return organizerModel.findByIdAndRemove(eventId, function (err,event) {
            if(event!=null){
                event.remove();
            }
        });
    }

    function  setModel(_model){
        model=_model;
        organizerSchema = require("./organizer.schema.server")(model);
        organizerModel = mongoose.model("organizerModel", organizerSchema);
    }
};