/**
 * Created by shohitbajaj on 10/04/17.
 */

module.exports=function (app,model) {
    app.get("/api/event/:eventId", findEventByEventId);
    app.post("/api/event/", createEvent);
    app.delete("/api/event/:eventId", deleteEvent);
    app.put("/api/event/:eventId", updateEvent);


    //var bookModel = model.bookModel;
    var userModel = model.userModel;
    var organizerModel= model.organizerModel;


    function deleteEvent(req, res) {
        var eventId = req.params.eventId;
        organizerModel
            .deleteEvent(eventId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createEvent(req, res) {

        //console.log("Create User called");
        var event = req.body;
        var newEvent = {
            eventName: event.eventName,
            eventDescription: event.eventDescription,
            eventLocation: event.eventLocation,
            eventDate: event.eventDate,
            eventTime: event.eventTime
        };

        organizerModel
            .createEvent(newEvent)
            .then(function (newEvent) {
                res.send(newEvent);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateEvent(req, res) {
        var eventId = req.params['eventId'];
        var newEvent = req.body;
        organizerModel
            .updateEvent(eventId, newEvent)
            .then(function (response) {
                if (response.nModified === 1) {
                    organizerModel
                        .findEventByEventId(eventId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function findEventByEventId(req, res) {
        var eventId = req.params['eventId'];
        organizerModel
            .findEventByEventId(eventId)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};