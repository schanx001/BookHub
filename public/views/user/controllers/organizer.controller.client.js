/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("organizerController", organizerController);
    function organizerController($scope){
        var vm=this;
        vm.show=show;

        function show() {
            alert(vm.event.location);
        }

        // function initAutocomplete() {
        //     alert("In auto");
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //         center: {lat: -33.8688, lng: 151.2195},
        //         zoom: 13,
        //         mapTypeId: 'roadmap'
        //     });
        //
        //     // Create the search box and link it to the UI element.
        //     var input = document.getElementById('pac-input');
        //     var searchBox = new google.maps.places.SearchBox(input);
        //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        //
        //     // Bias the SearchBox results towards current map's viewport.
        //     map.addListener('bounds_changed', function() {
        //         searchBox.setBounds(map.getBounds());
        //     });
        //
        //     var markers = [];
        //     // Listen for the event fired when the user selects a prediction and retrieve
        //     // more details for that place.
        //     searchBox.addListener('places_changed', function() {
        //         var places = searchBox.getPlaces();
        //
        //         if (places.length == 0) {
        //             return;
        //         }
        //
        //         // Clear out the old markers.
        //         markers.forEach(function(marker) {
        //             marker.setMap(null);
        //         });
        //         markers = [];
        //
        //         // For each place, get the icon, name and location.
        //         var bounds = new google.maps.LatLngBounds();
        //         places.forEach(function(place) {
        //             if (!place.geometry) {
        //                 console.log("Returned place contains no geometry");
        //                 return;
        //             }
        //             var icon = {
        //                 url: place.icon,
        //                 size: new google.maps.Size(71, 71),
        //                 origin: new google.maps.Point(0, 0),
        //                 anchor: new google.maps.Point(17, 34),
        //                 scaledSize: new google.maps.Size(25, 25)
        //             };
        //
        //             // Create a marker for each place.
        //             markers.push(new google.maps.Marker({
        //                 map: map,
        //                 icon: icon,
        //                 title: place.name,
        //                 position: place.geometry.location
        //             }));
        //
        //             if (place.geometry.viewport) {
        //                 // Only geocodes have viewport.
        //                 bounds.union(place.geometry.viewport);
        //             } else {
        //                 bounds.extend(place.geometry.location);
        //             }
        //         });
        //         map.fitBounds(bounds);
        //     });
        // }

        // initAutocomplete();
        $scope.$on('$viewContentLoaded', function(){
            alert("ajhsgdjagsdjag");

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