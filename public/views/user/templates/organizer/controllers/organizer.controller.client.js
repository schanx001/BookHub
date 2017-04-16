/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("organizerController", organizerController);
    function organizerController($scope, $routeParams, UserService, OrganizerService, $location, loggedin, $rootScope){
        var vm=this;
        vm.showUpdateBtn= false;
        vm.organizerEvents = [];
        vm.userId = loggedin.data._id;//$routeParams['oid'];
        vm.event="";
        vm.eventId="";
        vm.updateEvent = updateEvent;
        vm.deleteEvent=deleteEvent;
        vm.deleteUser = deleteUser;
        vm.addEvent = addEvent;
        vm.redirect= redirect;
        vm.editEvent= editEvent;
        vm.viewEvent= viewEvent;
        vm.onLoad=onLoad;
        vm.logout= logout;
        vm.updateUser = updateUser;
        vm.getEventsByOrganizerId = getEventsByOrganizerId;
       // vm.getEventsForUserId = getEventsForUserId;

        function onLoad() {
            e = jQuery.Event("keypress")
            e.which = 13 //choose the one you want
            $("#pac-input").keypress(function(){
            }).trigger(e)
        }


        function updateUser(newUser) {
            vm.error="";
            vm.message="";
            var user = newUser;
            if (user.username == null || user.username == undefined || user.username == "") {
                vm.error = "input empty! Please fill username";
                return;
            }
            // if(user.password==null)
            // {
            //     vm.error = "input empty! Please fill password";
            // }
            if (user.email == undefined || user.email == null) {
                vm.error = "input empty! Please fill email";
                return;

            }
            if (user.phone.toString().length < 10) {

                vm.error = "input empty! Phone number should be 10 digits";
                return;
            }
            else {

                UserService
                    .updateUser(vm.userId, newUser)
                    .success(function (response) {

                        vm.message = "user successfully updated";
                    })
                    .error(function () {
                        vm.error = "unable to update user";
                    });
            }
        }

        function redirect(){
            document.getElementById(test).style.display = 'block';

            $location.url("/organizer/addevent");

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
            vm.error="";
            vm.message="";
            var evm = newEvent;
            vm.error = "";
            vm.message = "";
            if (evm.eventName == null || evm.eventName == undefined || evm.eventName == "") {
                vm.error = "input empty! Please fill event name";
                return;
            }
            if (evm.eventDate == null || evm.eventDate == undefined || evm.eventDate == "") {
                vm.error = "input empty! Please fill event date";
                return;
            }
            if (evm.eventTime == null || evm.eventTime == undefined || evm.eventTime == "") {
                vm.error = "input empty! Please fill event time";
                return;
            }
            if (evm.eventLocation == null || evm.eventLocation == undefined || evm.eventLocation == "") {
                vm.error = "input empty! Please fill event Location";
            }
            else {
                var date="";
                date = (new Date(evm.eventDate).getDate()).toString() + '/' + (new Date(evm.eventDate).getMonth() + 1).toString() + '/' + (new Date(evm.eventDate).getYear() + 1900).toString();
                newEvent.eventDate= date;
                var eventId = newEvent._id;

                OrganizerService
                    .updateEvent(vm.userId, newEvent)
                    .then(function (response) {
                        document.getElementById('eventEditDiv' + eventId).classList.toggle('hidden');
                        document.getElementById('eventUpdateDiv' + eventId).classList.toggle('hidden');
                        document.getElementById('eventEditButtonDiv' + eventId).classList.toggle('hidden');
                        document.getElementById('eventUpdateButtonDiv' + eventId).classList.toggle('hidden');
                        vm.message = "event successfully updated";
                    }, function (error) {
                        vm.error = "unable to update event";

                    });
            }
        }

        function viewEvent(event) {
            $rootScope.eventId=event._id;
            $location.url("/organizer/eventdetails/event");
        }


        function addEvent() {

            vm.error = "";
            vm.message = "";
            if (vm.eventName == null || vm.eventName == undefined || vm.eventName == "") {
                vm.error = "input empty! Please fill event name";
                return;
            }
            if (vm.eventDate == null || vm.eventDate == undefined || vm.eventDate == "") {
                vm.error = "Please fill event date in correct format";
                return;
            }
            if (vm.eventTime == null || vm.eventTime == undefined || vm.eventTime == "") {
                vm.error = "Please fill event time in correct format";
                return;
            }

            var loc = document.getElementById('pac-input').value.toString();
            if (loc == null || loc == undefined || loc == "") {
                vm.error = "input empty! Please fill event Location";
            }
            else {

                var date = "";
                var Time = "";
                var hours = "";
                var mins = "";
                // alert(new Date(vm.eventTime).getHours());
                // alert(new Date(vm.eventTime).getMinutes());
                // alert(new Date(vm.eventTime).getSeconds());
                //alert(vm.eventDate.toDateString());
                date = (new Date(vm.eventDate).getDate()).toString() + '/' + (new Date(vm.eventDate).getMonth() + 1).toString() + '/' + (new Date(vm.eventDate).getYear() + 1900).toString();

                if (parseInt((new Date(vm.eventTime).getHours())) < 10) {
                    hours = '0' + (new Date(vm.eventTime).getHours()).toString();
                }
                else {
                    hours = (new Date(vm.eventTime).getHours()).toString();
                }

                if (parseInt((new Date(vm.eventTime).getMinutes())) < 10) {
                    mins = '0' + (new Date(vm.eventTime).getMinutes()).toString();
                }
                else {
                    mins = (new Date(vm.eventTime).getMinutes()).toString();
                }

                Time = hours + ':' + mins;

                //  .toString() + ':' + (new Date(vm.eventTime).getMinutes()).toString();
                //alert(Time);
                OrganizerService
                    .createEvent({
                        owner: vm.userId,
                        eventName: vm.eventName,
                        eventDescription: vm.eventDescription,
                        eventLocation: document.getElementById('pac-input').value.toString(),
                        //eventDate: vm.eventDate,
                        eventDate: date,
                        //eventTime: vm.eventTime
                        eventTime: Time
                    })
                    .then(function (response) {
                        // location.reload();
                        vm.message = "Event created !!";

                    }, function (error) {
                        vm.error = "Failed to add event !!";

                    })
            }
        }


        function deleteEvent(event) {

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
                vm.eventId=$rootScope.eventId;

                OrganizerService.findEventByEventId(vm.eventId)
                    .then(function(response){
                        vm.event=response.data;
                    });
            }
            if(document.URL.indexOf("addevent")>-1 || document.URL.indexOf("eventdetails")>-1 ){


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



        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }
    }
})();