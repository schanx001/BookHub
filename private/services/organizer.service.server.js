/**
 * Created by shohitbajaj on 10/04/17.
 */

module.exports=function (app,model) {
    app.get("/api/event/:eventId", findEventByEventId);
    app.get("/api/events/:organizerId", findEventsByOrganizerId);
    app.post("/api/event/", createEvent);
    app.delete("/api/event/:eventId", deleteEvent);
    app.put("/api/event/:organizerId", updateEvent);
    app.get("/api/allEvents/", getAllEvents);


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


    function getAllEvents(req,res) {
        organizerModel.getAllEventsFromDb().then(function (allEvents) {
            res.json(allEvents);
        },function (err) {

        })
    }

    function createEvent(req, res) {

        //console.log("Create User called");
        var event = req.body;

        // var newEvent = {
        //     eventName: event.eventName,
        //     eventDescription: event.eventDescription,
        //     eventLocation: event.eventLocation,
        //     eventDate: event.eventDate,
        //     eventTime: event.eventTime
        // };

        organizerModel
            .createEvent(event)
            .then(function (event) {
                res.send(event);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateEvent(req, res) {
        var organizerId = req.params['organizerId'];
        var newEvent = req.body;
        organizerModel
            .updateEvent(newEvent)
            .then(function (response) {

                    organizerModel
                        .findEventByEventId(newEvent._Id)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })

            }, function () {
                res.sendStatus(404);
            });
    }

    // function findEventByEventId(req, res) {
    //     var eventId = req.params['eventId'];
    //     console.log(eventId + "helloooooo");
    //     organizerModel
    //         .findEventByEventId(eventId)
    //         .then(function (event) {
    //             console.log(event + "ppppppppp");
    //             res.send(event);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    // }


    function findEventByEventId(req, res) {
        var userId=req.query.userId;
        var eventId = req.params['eventId'];
        if(userId!=undefined){
            organizerModel
                .findEventByEventId(eventId)
                .then(function (response) {
                    var rsvpArr=response.eventRSVP;
                    for(x in rsvpArr){
                        if(rsvpArr[x].toString()==userId.toString()){
                            res.send("Already Registered");
                        }
                    }
                    response.eventRSVP=rsvpArr.push(userId);
                    organizerModel
                        .updateEvent(response)
                        .then(function (responseNew) {
                            res.send("Added");
                        },function (error) {
                            res.sendStatus(404);
                        });
                },function (error) {

                });
        }else{
            organizerModel
                .findEventByEventId(eventId)
                .then(function (event) {
                    res.send(event);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }

    function findEventsByOrganizerId(req, res) {
        var organizerId = req.params['organizerId'];
        organizerModel
            .findEventsByOrganizerId(organizerId)
            .then(function (events) {
                res.json(events);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};