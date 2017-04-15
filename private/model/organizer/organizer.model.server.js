module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var organizerSchema ;//= require('./user.schema.server.js')();
    var organizerModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "createEvent":createEvent,
        "updateEvent": updateEvent,
        "findEventByEventId": findEventByEventId,
        "findEventsByOrganizerId": findEventsByOrganizerId,
        "deleteEvent":deleteEvent,
        "setModel":setModel,
        "getModel":getModel,
        "getAllEventsFromDb": getAllEventsFromDb
    };
    return api;

    function getModel() {
        return organizerModel;
    }

    function getAllEventsFromDb() {
        return organizerModel.find({_id:{$ne: null}});
    }
    function createEvent(event){
        return organizerModel.create(event);
    }

    function findEventByEventId(eventId){
        return organizerModel.findById(eventId);
    }

    function findEventsByOrganizerId(organizerId){
        return organizerModel.find({owner:organizerId});
    }

    function updateEvent(updatedEvent){
        return organizerModel.update({_id:updatedEvent._id},{$set:updatedEvent});
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