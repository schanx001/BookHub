(function () {
    angular
        .module("BookHubMaker")
        .controller("bookSearchController",bookSearchController);

    function bookSearchController(BookService, loggedin,SellerBooksService, UserService, $rootScope , $location){
        var vm=this;
        vm.sortBy="";
        vm.sortListings=["Price Low-High","Price High-Low","Title A-Z","Title Z-A","Recent"];
        vm.books=[];
        vm.sellerBooks=[];
        vm.bookNumber=0;
        vm.searchText="";
        vm.userId=loggedin.data._id;//;"";
        vm.getSortedListing=getSortedListing;
        vm.getAllAvBooks=getAllAvBooks;
        vm.getSortListingMobile=getSortListingMobile;
        vm.searchBook=searchBook;
        vm.requestBook=requestBook;
        vm.getAllSellerBooks=getAllSellerBooks;
        vm.logout=logout;
        vm.viewDetails=viewDetails;


        function viewDetails(bookId) {
            $rootScope.bookId = bookId;
            $location.url('/user/bookdetails/book?bookId='+bookId);
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

        function getAllSellerBooks() {

            SellerBooksService.findAllBooks()
                .then(function (response) {
                    vm.sellerBooks=response.data;
                })

        }

        function requestBook(book) {
            BookService
                .requestBookService(book._id,vm.userId)
                .then(function (response) {
                    for(var x in vm.books){
                        if(vm.books[x]===book){
                            vm.books.splice(x,1);
                            break;
                        }
                    }
                },function (error) {
                    // vm.error=error;
                });
        }

        function searchBook() {
            if(vm.searchText!=""){
                // console.log(vm.searchText);
                BookService
                    .findBooksByName(vm.searchText)
                    .then(function (response) {
                        vm.books=response.data;
                        if(response.data.length===0){
                            vm.error="Book not available";
                        }
                    },function (error) {
                        vm.error="Book not available";
                    })
            }
        }

        function getSortListingMobile(opt) {
            vm.sortBy=opt;
            getSortedListing();
        }

        function getAllAvBooks() {
            BookService
                .findAllAvBooks()
                .then(function (response) {
                    vm.books=response.data;
                },function (error) {
                });
        }

        function init() {
            getAllAvBooks();
            getAllSellerBooks();
        }
        init();

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
        // function addBook() {
        //     // alert("book");
        //     BookService
        //         .createBook({
        //             owner:"58e409f17cdcab10d06b398d",
        //             title:"book"+vm.bookNumber,
        //             author:"author"+vm.bookNumber,
        //             price:vm.bookNumber,
        //             imgsrc:"link"+vm.bookNumber,
        //             currentlyWith:"58e409f17cdcab10d06b398d",
        //             status:"available"})
        //             .then(function (response) {
        //                 // console.log("addbook="+response.data);
        //                 vm.books=[];
        //                 if(document.getElementById("div_book_listing")){
        //                     document.getElementById("div_book_listing").innerHTML="";
        //                 }
        //                 if(document.getElementById("div_book_listing_mobile")){
        //                     document.getElementById("div_book_listing_mobile").innerHTML="";
        //                 }
        //                 getAllAvBooks();
        //             },function (error) {
        //                 console.log("addbookerror="+error);
        //             })
        // }

    }

})();
