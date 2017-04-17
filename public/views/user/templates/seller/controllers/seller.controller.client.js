/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("sellerController", sellerController);
    function sellerController($http,$scope, $routeParams, UserService, SellerService, $location, $timeout,loggedin,$rootScope){
        var vm=this;
        vm.showUpdateBtn= false;
        vm.sellerBooks = [];
        vm.shop="";
        vm.error="";
        vm.message="";
        //vm.shop.owner=$routeParams['sid'];
        vm.userId = loggedin.data._id;//$routeParams['sid'];
        //  vm.shop = {
        //      shopLocation: 'Mumbai, Maharashtra, India',
        //     owner: vm.userId//$routeParams['sid']
        // };
         // var outer=null;
        var imported=null;



        vm.bookPrice=0;
        vm.bookTitle="";
        vm.bookDescription="";
        vm.updateBook = updateBook;
        vm.updateShopDetails = updateShopDetails;
        vm.deleteBook=deleteBook;
        vm.deleteUser = deleteUser;
        //vm.addBook = addBook;
        vm.redirect= redirect;
        vm.editBook= editBook;
        //vm.searchBook=searchBook;
        vm.viewBook= viewBook;
        vm.enter= enter;
        vm.logout=logout;
        vm.getBooksBySellerId = getBooksBySellerId;
        vm.removejscssfile=removejscssfile;
        // vm.checkFunc=checkFunc;
        // vm.getBooksForUserId = getBooksForUserId;


        function setOuter(abc) {

            outer=abc;
        }


        function removejscssfile(filename, filetype){
            var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
            var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
            var allsuspects=document.getElementsByTagName(targetelement)
            for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
                    allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
            }
        }


function enter() {
    //$('#pac-input').focus();
    // document.getElementById("trigger-search").click();
    // //document.getElementById("pac-input").trigger(jQuery.Event('keypress', { keycode: 13 }));
    // $('#pac-input').trigger(jQuery.Event('keypress', { keycode: 13 }));
    //  $('#pac-input').blur();

    //google.maps.event.trigger(searchBox, 'place_changed');

        // var input = document.getElementById('pac-input');
        //
        // google.maps.event.trigger(input, 'focus');
        // google.maps.event.trigger(input, 'keydown', {
        //     keyCode: 13
        // });
}
        function scan() {

        }






        function updateShopDetails(updatedShop) {
            var evm = updatedShop;
            vm.error = "";
            vm.message = "";
            if (evm.shopEmail == null || evm.shopEmail == undefined || evm.shopEmail == "") {
                vm.error = "Please fill email address in correct format";
                return;
            }
            if(evm.shopPhone.toString().length != 10){

                vm.error = "Phone number should be 10 digits";
                return;
            }
            var loc = document.getElementById('pac-input').value.toString();
            if (loc == null || loc == undefined || loc == "") {
                vm.error = "Please fill shop Location";
                return;
            }
            if (evm.shopName == null || evm.shopName == undefined || evm.shopName == "") {
                vm.error = "Please fill Shop Name";
            }
            else {


                updatedShop.owner = vm.userId;
                //alert(updatedShop.owner);
                SellerService.findShopBySellerId(updatedShop.owner)
                    .success(function (response) {

                        if (response.length != 0) {
                            // alert(document.getElementById('pac-input').value);

                            updatedShop.mapPlace = getOuter();
                            updatedShop.shopLocation = document.getElementById('pac-input').value;
                            SellerService
                                .updateShopDetails(vm.userId, updatedShop)
                                .success(function (response) {

                                    vm.message = "shop details successfully updated";
                                })
                                .error(function () {
                                    vm.error = "unable to update";
                                })
                        } else {
                            //     alert("create");

                            //console.log("create wala"+getOuter());
                            //console.log(updatedShop.shopPhone);
                            //console.log(updatedShop.shopEmail);

                            SellerService
                                .createShopDetails(vm.userId, updatedShop)
                                .success(function (response) {

                                    vm.message = "shop details successfully updated";
                                })
                                .error(function () {
                                    vm.error = "unable to update";
                                });
                        }


                    }).error(function () {

                });

            }
        }




        // function onLoad() {
        //     e = jQuery.Book("keypress")
        //     e.which = 13 //choose the one you want
        //     $("#pac-input").keypress(function(){
        //     }).trigger(e)
        // }

        function redirect(){
            document.getElementById(test).style.display = 'block';
            vm.removejscssfile("maps.js", "js");
            vm.removejscssfile("common.js", "js");
            vm.removejscssfile("map.js", "js");
            vm.removejscssfile("util.js", "js");
            vm.removejscssfile("controls.js", "js");
            vm.removejscssfile("places_impl.js", "js");
            vm.removejscssfile("onion.js", "js");
            vm.removejscssfile("stats.js", "js");
            vm.removejscssfile("marker.js", "js");
            // document.head.removeChild(imported);
            $location.url("/seller/addbook");

        }

        function editBook(bookId) {
            document.getElementById('bookEditDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookUpdateDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookEditButtonDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookUpdateButtonDiv'+bookId).classList.toggle('hidden');
        }

        // function updateBook(newBook) {
        //
        //     SellerService
        //         .updateBook(bookId, newBook)
        //         .success(function (response) {
        //
        //             vm.message = "book successfully updated";
        //         })
        //         .error(function () {
        //             vm.error = "unable to update book";
        //         });
        // }

        function updateBook(newBook) {
            vm.shop.owner=loggedin.data._id;//$routeParams['sid'];
            var bookId = newBook._id;
            var price=newBook.price;
            if(price==undefined || price==null || price=="" || parseInt(price)<0){
                newBook.price=0;
            }
            SellerService
                .updateBook(vm.userId, newBook)
                .then(function (response) {
                    document.getElementById('bookEditDiv'+bookId).classList.toggle('hidden');
                    document.getElementById('bookUpdateDiv'+bookId).classList.toggle('hidden');
                    document.getElementById('bookEditButtonDiv'+bookId).classList.toggle('hidden');
                    document.getElementById('bookUpdateButtonDiv'+bookId).classList.toggle('hidden');
                    vm.message = "book successfully updated";
                },function (error) {
                    vm.error = "unable to update book";

                });
        }

        function viewBook(book) {
            $rootScope.bookId = book._id;
            $location.url("/seller/bookdetails/book");
        }


        // function addBook() {
        //     alert("book");
        //     SellerService
        //         .createBook({
        //             owner: vm.userId,
        //             bookName: vm.bookName
        //             //bookDescription: vm.bookDescription,
        //             //bookLocation: document.getElementById('pac-input').value.toString(),
        //             // bookDate: vm.bookDate,
        //             // bookTime: vm.bookTime})
        //                 .then(function (response) {
        //                     // location.reload();
        //                     vm.message = "Book created !!";
        //
        //                 }, function (error) {
        //                     vm.error = "Failed to add book !!";
        //
        //                 })
        //         })
        // }


        function deleteBook(book) {
            var bookId= book._id;
            SellerService
                .deleteBook(bookId)
                .then(function (response) {
                    // getBooksForUserId(userId);
                    location.reload();
                    // var books=response.data;
                    // var userBooks=[];
                    // for (var x in books){
                    //     if(books[x].owner===userId){
                    //         userBooks.slice(books[x],1);
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
            //vm.shop.owner=$routeParams['sid'];
            if($rootScope.currentUser.role==='seller'){
            vm.message = "";
            vm.user = UserService.findUserById(vm.userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
            getBooksBySellerId(vm.userId);
            getShopBySellerId(vm.userId);

            if (document.URL.indexOf("bookdetails") > -1) {
                var bookId = $routeParams['eid'];

                SellerService.findBookByBookId(bookId)
                    .then(function (response) {
                        vm.book = response.data;
                    });
            }
            // if(document.URL.indexOf("addbook")>-1 || document.URL.indexOf("bookdetails")>-1 ){


            $scope.$on('$viewContentLoaded', function () {
                // if(!loaded){

                // document.head.removeChild(imported);
                    // alert(2);
                // var imported = document.createElement('script');
                // imported.src = '../../../js/script.js';
                // document.head.appendChild(imported);


               // $('#pac-input').focus();
                // $timeout(function() {
                //     var input = angular.element("#" + 'pac-input')[0];
                //     google.maps.event.trigger(input, 'focus');
                //     google.maps.event.trigger(input, 'keydown', {
                //         keyCode: 13
                //     });
                // }, 1000);


                });
            }else{
                $rootScope.currentUser=null;
                $location.url('/login');
            }
            //$('#pac-input').trigger(jQuery.Event('keypress', { keycode: 13 }));
        }

        init();

        function renderUser(user) {
            //console.log("haveli");

            vm.user = user;
        }


        function getBooksBySellerId(sellerId) {
            SellerService
                .findBooksBySellerId(sellerId)
                .then(function (response) {
                    // console.log(response.data);
                    var books = response.data;
                    var sellerBooks= [];
                    for (var x in books) {
                        sellerBooks.push(books[x]);
                    }
                    // console.log("requestedBooks:"+requestedBooks);
                    vm.sellerBooks = sellerBooks;
                    // console.log("requestedForBooks:"+requestedForBooks);
                }, function (error) {
                    // console.log("error:"+error);
                });
        }

        function getShopBySellerId(sellerId) {
            SellerService
                .findShopBySellerId(sellerId)
                .then(function (response) {
                    vm.shop=response.data;
                    //alert(response.data);
                    // console.log(response.data);
                    // console.log("requestedBooks:"+requestedBooks);

                    // console.log("requestedForBooks:"+requestedForBooks);
                    // alert("vm.mapPlace="+vm.shop.mapPlace);
                    // document.getElementById('mapLocationObject').innerHTML=JSON.stringify(vm.shop.mapPlace);

                    // setNewPlace(vm.shop.mapPlace);
                    if(vm.shop!=undefined){

                        newPlaces=vm.shop.mapPlace;
                    }else{

                        newPlaces=null;
                        SellerService
                            .createShopDetails(vm.userId, {owner: vm.userId})
                            .success(function () {
                                //vm.message= "shop details update !!"
                            })
                            .error(function () {
                               // vm.error= "unable to update";
                            })
                    }

                    if(window.location.toString().indexOf('/profile')>-1){
                        imported=null;
                        imported = document.createElement('script');
                        imported.src = '../../../js/maps.js';
                        document.head.appendChild(imported);
                        // alert(1);
                        // }

                    }

                }, function (error) {
                    // console.log("error:"+error);
                });
        }


        function logout() {
            vm.removejscssfile("maps.js", "js");
            vm.removejscssfile("common.js", "js");
            vm.removejscssfile("map.js", "js");
            vm.removejscssfile("util.js", "js");
            vm.removejscssfile("controls.js", "js");
            vm.removejscssfile("places_impl.js", "js");
            vm.removejscssfile("onion.js", "js");
            vm.removejscssfile("stats.js", "js");
            vm.removejscssfile("marker.js", "js");
            // document.head.removeChild(imported);
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        // document.getElementById('pac-input').onmouseout = function () {
        //
        //     var input = document.getElementById('pac-input');
        //
        //     google.maps.event.trigger(input, 'focus');
        //     google.maps.event.trigger(input, 'keydown', {
        //         keyCode: 13
        //     });
        // };


    }
})();
