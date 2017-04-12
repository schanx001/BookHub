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
        vm.event="";
        vm.updateEvent = updateEvent;
        vm.deleteEvent=deleteEvent;
        vm.deleteUser = deleteUser;
        vm.addEvent = addEvent;
        vm.redirect= redirect;
        vm.editEvent= editEvent;
        vm.viewEvent= viewEvent;
        vm.onLoad=onLoad;
        vm.getEventsByOrganizerId = getEventsByOrganizerId;
       // vm.getEventsForUserId = getEventsForUserId;

        function onLoad() {
            e = jQuery.Event("keypress")
            e.which = 13 //choose the one you want
            $("#pac-input").keypress(function(){
            }).trigger(e)
        }

        function redirect(){
            document.getElementById(test).style.display = 'block';

            $location.url("/organizer/"+ vm.userId +"/addevent");

        }

        function editEvent(eventId) {
            document.getElementById('eventEditDiv'+eventId).classList.toggle('hidden');
            document.getElementById('eventUpdateDiv'+eventId).classList.toggle('hidden');
            document.getElementById('eventEditButtonDiv'+eventId).classList.toggle('hidden');
            document.getElementById('eventUpdateButtonDiv'+eventId).classList.toggle('hidden');
        }

        // function updateEvent(newEvent) {
        //
        //     OrganizerService
        //         .updateEvent(eventId, newEvent)
        //         .success(function (response) {
        //
        //             vm.message = "event successfully updated";
        //         })
        //         .error(function () {
        //             vm.error = "unable to update event";
        //         });
        // }

        function updateEvent(newEvent) {
            var eventId = newEvent._id;
            alert(eventId);
            OrganizerService
                .updateEvent(vm.userId, newEvent)
                .then(function (response) {
                    document.getElementById('eventEditDiv'+eventId).classList.toggle('hidden');
                    document.getElementById('eventUpdateDiv'+eventId).classList.toggle('hidden');
                    document.getElementById('eventEditButtonDiv'+eventId).classList.toggle('hidden');
                    document.getElementById('eventUpdateButtonDiv'+eventId).classList.toggle('hidden');
                    vm.message = "event successfully updated";
                },function (error) {
                    vm.error = "unable to update event";

                });
        }

        function viewEvent(event) {
            $location.url("/organizer/" +vm.userId + "/eventdetails/" + event._id);
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
            if(document.URL.indexOf("eventdetails")>-1) {
                var eventId=$routeParams['eid'];

                OrganizerService.findEventByEventId(eventId)
                    .then(function(response){
                        vm.event=response.data;
                    });
            }
            if(document.URL.indexOf("addevent")>-1 || document.URL.indexOf("eventdetails")>-1 ){

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