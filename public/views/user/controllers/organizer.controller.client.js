/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("organizerController", organizerController);
    function organizerController($scope, $routeParams, UserService, OrganizerService, $location){
        var vm=this;
        vm.userEvents = [];
        var userId = $routeParams['uid'];
        vm.updateEvent = updateEvent;
        vm.deleteEvent=deleteEvent;
        vm.deleteUser = deleteUser;
        vm.addEvent = addEvent;
        vm.getEventsForUserId = getEventsForUserId;



        function addEvent(eventToAdd) {
            // alert("book");
            OrganizerService
                .createEvent({
                    owner:vm.userId,
                    eventName: vm.eventName,
                    eventDescription: vm.eventDescription,
                    eventLocation: vm.eventLocation,
                    eventDate: vm.eventDate,
                    eventTime: vm.eventTime
                .then(function (response) {

                },function (error) {

                })
        })
        }


        function deleteEvent(eventId) {
            OrganizerService
                .deleteEventService(eventId,userId)
                .then(function (response) {
                    // getBooksForUserId(userId);
                    var events=response.data;
                    var userEvents=[];
                    for (var x in events){
                        if(events[x].owner===userId){
                            userEvents.slice(events[x],1);
                        }
                    }
                },function (error) {
                    vm.error="Unable to delete";
                });
        }

        function updateEvent(newEvent) {

            OrganizerService
                .updateEvent(eventId, newEvent)
                .success(function (response) {

                    vm.message = "event successfully updated";
                })
                .error(function () {
                    vm.error = "unable to update event";
                });
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

        function init() {
            vm.message="";
            vm.user = UserService.findUserById(userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
            getEventsForUserId(userId);
        }

        init();

        function renderUser(user) {
            //console.log("haveli");

            vm.user = user;
        }


        function getEventsForUserId(userId) {
            OrganizerService
                .findEventsByUserId(userId)
                .then(function (response) {
                    // console.log(response.data);
                    var events=response.data;
                    var userEvents;
                    for (var x in events){
                        if(events[x].owner===userId){
                            userEvents.push(events[x]);
                        }
                    }
                    // console.log("requestedBooks:"+requestedBooks);
                    vm.userEvents=userEvents;
                    // console.log("requestedForBooks:"+requestedForBooks);
                },function (error) {
                    // console.log("error:"+error);
                });
        }


        $scope.$on('$viewContentLoaded', function(){
            var imported = document.createElement('script');
            imported.src = '../../../js/maps.js';
            document.head.appendChild(imported);

            var imported = document.createElement('script');
            imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBhLoBYnRtlTL2wIDcZ_5u3SEm-dDN6hgI&libraries=places&callback=initAutocomplete';
            imported.defer="";
            imported.async="";
            document.head.appendChild(imported);

        });




    }
})();