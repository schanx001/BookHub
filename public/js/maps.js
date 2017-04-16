
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var outer=null;
// loaded=true;
// var newPlace=null;

function getOuter() {

    return outer;
}
// function setNewPlace(p) {
//     newPlace=p;
// }
// alert(3);
function initAutocomplete() {
    // alert(4);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {

        searchBox.setBounds(map.getBounds());
    });
    // alert("hello");
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    //
    // //Trial
    // var newPlace=document.getElementById('mapplacediv').innerHTML;
    //
    // console.log("Places="+newPlace);
    // var places=[];
    // // var places = [JSON.parse(newPlace)];
    // //console.log(places.geometry.location +"uuuuuu");
    //
    // if (places.length == 0) {
    //     return;
    // }
    //
    //
    //
    // // Clear out the old markers.
    // markers.forEach(function(marker) {
    //     marker.setMap(null);
    // });
    // markers = [];
    //
    // // For each place, get the icon, name and location.
    // var bounds = new google.maps.LatLngBounds();
    //
    // places.forEach(function(place) {
    //     // console.log(place);
    //
    //     if (!place.geometry) {
    //         console.log("Returned place contains no geometry");
    //         return;
    //     }
    //     var icon = {
    //         url: place.icon,
    //         size: new google.maps.Size(71, 71),
    //         origin: new google.maps.Point(0, 0),
    //         anchor: new google.maps.Point(17, 34),
    //         scaledSize: new google.maps.Size(25, 25)
    //     };
    //
    //     // Create a marker for each place.
    //     markers.push(new google.maps.Marker({
    //         map: map,
    //         icon: icon,
    //         title: place.name,
    //         position: place.geometry.location
    //     }));
    //
    //     console.log(place.geometry.location +"qwerty");
    //     if (place.geometry.viewport) {
    //         // Only geocodes have viewport.
    //         bounds.union(place.geometry.viewport);
    //     } else {
    //         bounds.extend(place.geometry.location);
    //     }
    // });
    // map.fitBounds(bounds);
    // //Trail End





    searchBox.addListener('places_changed', listenerFunction);

    // var places;

    function listenerFunction() {

        var places = searchBox.getPlaces();
        //console.log(places.geometry.location +"uuuuuu");

        // console.log(places);
        outer=places;

        placesFunction(places);

    }

    function placesFunction(placesNew) {
        if (placesNew.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        placesNew.forEach(function(place) {
            // console.log(place);

            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    }
    // alert("In Maps="+newPlaces);

    // alert("Hello"+document.getElementById('mapLocationObject').innerHTML);
    // var string=document.getElementById('mapLocationObject').innerHTML;
//     string = string.replace(/\\n/g, "\\n")
//         .replace(/\\'/g, "\\'")
//         .replace(/\\"/g, '\\"')
//         .replace(/\\&/g, "\\&")
//         .replace(/\\r/g, "\\r")
//         .replace(/\\t/g, "\\t")
//         .replace(/\\b/g, "\\b")
//         .replace(/\\f/g, "\\f");
// // remove non-printable and other non-valid JSON chars
//     string = string.replace(/[\u0000-\u0019]+/g,"");
//     var obj=JSON.parse(string);

    if(newPlaces!=undefined){
        placesFunction(newPlaces);
    }
    newPlaces=null;
}
// initAutocomplete();



imported=null;
imported = document.createElement('script');
imported.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBhLoBYnRtlTL2wIDcZ_5u3SEm-dDN6hgI&libraries=places&callback=initAutocomplete';
imported.defer = "";
imported.async = "";
document.head.appendChild(imported);