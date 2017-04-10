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
            //"login" : login,
            //"logout" : logout,
            //"register":register
        };
        return api;
        
        function deleteEvent(eventId) {
            return $http.delete("/api/event/"+eventId);
        }

        function createEvent(event) {
            return $http.post("/api/event", event);
        }


        function updateEvent(eventId, newEvent) {
            return $http.put("/api/event/"+eventId, newEvent);
        }

        function findEventByEventId(eid) {
            return $http.get("/api/event/"+eid);
        }
    }
})();