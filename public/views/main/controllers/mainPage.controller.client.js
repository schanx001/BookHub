(function () {
    angular
        .module("BookHubMaker")
        .controller("mainPageController", function ($http, $scope, $routeParams, UserService, BookService,SellerBooksService, OrganizerService, $location, $rootScope) {
            var vm = this;
            // vm.getBookListing=getBookListing;
            // vm.getBookListingMobile=getBookListingMobile;
            vm.processImage = processImage;
            vm.getAllEvents= getAllEvents;
            vm.rsvpEvent=rsvpEvent;
            vm.searchBook=searchBook;
            vm.getAllAvBooks=getAllAvBooks;
            vm.sortListings=["Price Low-High","Price High-Low","Title A-Z","Title Z-A","Recent"];
            vm.getAllSellerBooks=getAllSellerBooks;
            vm.genreListings=["Science Fiction","Arts & Photography","Horror","Children Books","History","Literature & Fiction"];
            vm.genre="Horror";
            vm.allEvents="";
            vm.viewDetails=viewDetails;
            vm.viewSellerDetails = viewSellerDetails;
            vm.requestBook=requestBook;
            vm.getSortedListing=getSortedListing;
            vm.user=null;
            vm.logout = logout;
            vm.searchText="";

            function viewSellerDetails(bookId) {

                $location.url('/seller/book/viewbook?sellerBookId='+bookId);
            }

            function logout(){
                UserService
                    .logout()
                    .then(
                        function (response) {
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        }
                    )
            }
            function getSortedListing() {
                // vm.books=orderBy(vm.books,vm.sortBy,true);
                if(vm.sortBy===""){
                    vm.sort="";
                    vm.reverse=true;
                }else{
                    if(vm.sortBy==="Price Low-High"){
                        vm.sort="price";
                        vm.reverse=false;
                    }else if(vm.sortBy==="Price High-Low"){
                        vm.sort="price";
                        vm.reverse=true;
                    }else if(vm.sortBy==="Title A-Z"){
                        vm.sort="title";
                        vm.reverse=false;
                    }else if(vm.sortBy==="Title Z-A"){
                        vm.sort="title";
                        vm.reverse=true;
                    }else{
                        vm.sort="dateCreated";
                        vm.reverse=true;
                    }
                }
            }

            function requestBook(book) {
                if($rootScope.currentUser==undefined || $rootScope.currentUser.role!="user"){
                    $location.url("/login");
                }
                BookService
                    .requestBookService(book._id,$rootScope.currentUser._id)
                    .then(function (response) {
                        for(var x in vm.books){
                            if(vm.books[x]===book){
                                vm.books[x].status="requested";
                                break;
                            }
                        }
                    },function (error) {
                        // vm.error=error;
                    });
            }


            function viewDetails(bookId) {
                //$rootScope.bookId = bookId;
                $location.url('/user/bookdetails/book?bookId='+bookId);
            }

            function rsvpEvent(event) {
                // alert("in");
                if($rootScope.currentUser==undefined || $rootScope.currentUser.role!="user"){
                    $location.url("/login");
                }
                OrganizerService
                    .rsvpEventService($rootScope.currentUser._id,event._id)
                    .then(function (response) {
                        if(response.data=="Already Registered"){
                            document.getElementById("available"+event._id).innerHTML="You have RSVPd earlier";
                        }
                        if(response.data=="Added"){
                            document.getElementById("available"+event._id).innerHTML="RSVP Done";
                        }
                        document.getElementById("available"+event._id).classList.toggle("hidden");
                        document.getElementById("rsvpButton"+event._id).classList.toggle("hidden");
                    },function (error) {

                    });
            }

            function getAllAvBooks() {
                BookService
                    .getAllBooks()
                    .then(function (books){
                        if(!$rootScope.currentUser.role || $rootScope.currentUser.role==undefined){

                            vm.books = books.data;

                        }else if($rootScope.currentUser.role!="user"){
                            var bookArray=books.data;
                            for(x in bookArray){

                                    bookArray[x].noRequest=true;

                            }
                            vm.books = bookArray;
                        }else{
                            var bookArray=books.data;
                            for(x in bookArray){
                                if(bookArray[x].owner==$rootScope.currentUser._id){
                                    bookArray[x].noRequest=true;
                                }
                            }
                            vm.books = bookArray;
                        }

                    }, function (err) {
                            vm.error = err;
                    });
            }

            function getAllSellerBooks() {

                SellerBooksService.findAllBooks()
                    .then(function (response) {
                        vm.sellerBooks=response.data;
                    })

            }

            function searchBook() {
                if(vm.searchText!=""){
                    // console.log(vm.searchText);
                    BookService
                        .findBooksByName(vm.searchText)
                        .then(function (books) {
                            if($rootScope.currentUser==undefined){
                                vm.books = books.data;
                            }else if($rootScope.currentUser.role!="user"){
                                var bookArray=books.data;
                                for(x in bookArray){
                                    if(bookArray[x].owner==$rootScope.currentUser._id){
                                        bookArray[x].noRequest=true;
                                    }
                                }
                                vm.books = bookArray;
                            }else{
                                var bookArray=books.data;
                                for(x in bookArray){
                                    if(bookArray[x].owner==$rootScope.currentUser._id){
                                        bookArray[x].noRequest=true;
                                    }
                                }
                                vm.books = bookArray;
                            }


                            // vm.books=response.data;
                            // if(response.data.length===0){
                            //     vm.error="Book not available";
                            // }
                        },function (error) {
                            vm.error="Book not available";
                        })
                }else{
                    getAllAvBooks();
                }
            }


            function init(){

                UserService
                    .findCurrentUser()
                    .then(function (response) {
                        vm.user = response.data;
                        $rootScope.currentUser=response.data;

                        getAllAvBooks();
                        getAllSellerBooks();
                        getAllEvents();
                    });


            }
            init();
            // getBookListing();
            // function getBookListingMobile(genre) {
            //     // console.log("Inside mobile listing "+genre);
            //     vm.genre=genre;
            //     getBookListing();
            // }
            function processImage(url) {
                var temp;
                return url.replace("zoom=1","zoom=0").replace("edge=curl&","");
            }
            // function getBookListing() {
            //     // console.log("Inside");
            //     vm.books=[];
            //     var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=subject:"+vm.genre;
            //     var gbooks=$http.get(googleAPI);
            //     if(document.getElementById("div_book_listing")){
            //         document.getElementById("div_book_listing").innerHTML="";
            //     }
            //     if(document.getElementById("div_book_listing_mobile")){
            //         document.getElementById("div_book_listing_mobile").innerHTML="";
            //     }
            //     gbooks.then(function(response){
            //         // console.log(response.data);
            //         for( var i=0;i<response.data.items.length;i++){
            //             vm.books.push(response.data.items[i]);
            //         }
            //         // console.log(vm.books);
            //         // console.log(vm.books[0].kind);
            //         // console.log(vm.books[0].volumeInfo.title);
            //     },function (response) {
            //         // console.log(response);
            //
            //     });
            //
            // }
            function getAllEvents(){
                OrganizerService.getAllEvents()
                    .then(function (allEvents){
                        vm.allEvents=allEvents.data;
                },function (err) {

                    });

            }

        });
})();
