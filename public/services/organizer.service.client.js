/**
 * Created by schanx on 3/27/17.
 */
(function(){
    angular
        .module("BookHubMaker")
        .factory("OrganizerService",OrganizerService);
    function OrganizerService($http) {
        var api = {
            "createEvent":createEvent,
            "updateEvent": updateEvent,
            //"findUserByCredentials": findUserByCredentials,
            "findEventByEventId": findEventByEventId,
            //"findUserByUsername": findUserByUsername,
            "deleteEvent":deleteEvent,
            "findEventsByOrganizerId": findEventsByOrganizerId,
            "rsvpEventService":rsvpEventService,
            "getAllEvents": getAllEvents
            //"login" : login,
            //"logout" : logout,
            //"register":register
        };
        return api;

        function rsvpEventService(userId,eventId) {
            return $http.get("/api/event/"+eventId+"?userId="+userId);
        }
        
        function deleteEvent(eventId) {
            return $http.delete("/api/event/"+eventId);
        }

        function createEvent(event) {
            return $http.post("/api/event/", event);
        }


        function updateEvent(organizerId, newEvent) {
            return $http.put("/api/event/"+organizerId, newEvent);
        }

        function findEventByEventId(eid) {
            return $http.get("/api/event/"+eid);
        }

        function findEventsByOrganizerId(oid) {
            return $http.get("/api/events/"+oid);
        }

        function getAllEvents() {
            return $http.get("/api/allEvents/");
        }
    }
})();