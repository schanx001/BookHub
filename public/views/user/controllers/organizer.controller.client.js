/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("organizerController", organizerController);
    function organizerController($scope, $routeParams, UserService, OrganizerService, $location){
        var vm=this;
        vm.showUpdateBtn= false;
        vm.organizerEvents = [];
        vm.userId = $routeParams['oid'];
        vm.updateEvent = updateEvent;
        vm.deleteEvent=deleteEvent;
        vm.deleteUser = deleteUser;
        vm.addEvent = addEvent;
        vm.redirect= redirect;
        vm.getEventsByOrganizerId = getEventsByOrganizerId;
       // vm.getEventsForUserId = getEventsForUserId;


        function redirect(){
            document.getElementById(test).style.display = 'block';

            $location.url("/organizer/"+ vm.userId +"/addevent");

        }


        function addEvent() {
            alert("book");
            OrganizerService
                .createEvent({
                    owner:vm.userId,
                    eventName: vm.eventName,
                    eventDescription: vm.eventDescription,
                    eventLocation: document.getElementById('pac-input').value.toString(),
                    eventDate: vm.eventDate,
                    eventTime: vm.eventTime})
                        .then(function (response) {
                           // location.reload();
                            vm.message="Event created !!";

                        },function (error) {
                            vm.error= "Failed to add event !!";

                        })
        }


        function deleteEvent(event) {
            alert(event);
            var eventId= event._id;
            OrganizerService
                .deleteEvent(eventId)
                .then(function (response) {
                    // getBooksForUserId(userId);
                    location.reload();
                    // var events=response.data;
                    // var userEvents=[];
                    // for (var x in events){
                    //     if(events[x].owner===userId){
                    //         userEvents.slice(events[x],1);
                    //     }
                    // }
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
            vm.user = UserService.findUserById(vm.userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
            getEventsByOrganizerId(vm.userId);
            if(document.URL.indexOf("addevent")>-1){

                console.log("maps error");

                $scope.$on('$viewContentLoaded', function () {
                    var imported = document.createElement('script');
                    imported.src = '../../../js/maps.js';
                    document.head.appendChild(imported);

                    var imported = document.createElement('script');
                    imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBhLoBYnRtlTL2wIDcZ_5u3SEm-dDN6hgI&libraries=places&callback=initAutocomplete';
                    imported.defer = "";
                    imported.async = "";
                    document.head.appendChild(imported);

                });

            }
        }

        init();

        function renderUser(user) {
            //console.log("haveli");

            vm.user = user;
        }


        function getEventsByOrganizerId(organizerId) {
            OrganizerService
                .findEventsByOrganizerId(organizerId)
                .then(function (response) {
                    // console.log(response.data);
                    var events = response.data;
                    var organizerEvents= [];
                    for (var x in events) {
                            organizerEvents.push(events[x]);
                        }
                    // console.log("requestedBooks:"+requestedBooks);
                    vm.organizerEvents = organizerEvents;
                    // console.log("requestedForBooks:"+requestedForBooks);
                }, function (error) {
                    // console.log("error:"+error);
                });
        }



    }
})();