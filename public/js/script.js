/*
/!* When the user clicks on the button,
 toggle between hiding and showing the dropdown content *!/
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}*/
/*
$(function() {
    $(function (){
        $(".navbar-nav li a").click(function(event) {
            $(".navbar-toggle:visible").click();
        });
    });
});
*/

// function checkFunc(e) {
//     alert("Its working");
// }
// // initAutocomplete();
// // alert(document.getElementById('pac-input').value);
//
// $(
//     function () {
//         alert("Inside");
//         var e = $.Event( "keypress", { which: 13 } );
//         $('#pac-input').trigger(e);
//
//
//
// }
//
// );
// alert("Hi I am here");
var newPlaces=null;
var imported=null;
// var loaded=false;
