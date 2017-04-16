/**
 * Created by shohitbajaj on 29/03/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, BookService, $location, $rootScope, loggedin, $route) {
        var vm = this;
        var userId = loggedin.data._id;
        vm.requestedBooks=[];
        vm.requestedForBooks=[];
        vm.booksAvailable=[];
        vm.booksShared=[];
        vm.updateUser = updateUser;
        vm.deleteBook=deleteBook;
        vm.deleteUser = deleteUser;
        vm.editBook=editBook;
        vm.updateBook=updateBook;
        vm.updateRequest=updateRequest;
        vm.bookReturned=bookReturned;
        vm.viewDetails = viewDetails;
        // vm.getBooksRequestedForAndRequested=getBooksRequestedForAndRequested;
        // vm.getUserBooksStats="";
        vm.booksForUserId=null;
        vm.logout = logout;

        function viewDetails(bookId) {
            $rootScope.bookId = bookId;
            $location.url('/user/bookdetails/book?bookId='+bookId);
        }
        
        function bookReturned(book) {
            BookService
                .bookReturnedService(book)
                .then(function (response) {
                    for(var x in vm.booksShared){
                        if(vm.booksShared[x]===book){
                            vm.booksShared.splice(x,1);
                            break;
                        }
                    }
                    vm.booksAvailable.push(book);
                },function (error) {

                });
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

        function updateRequest(book,request) {
            BookService
                .acceptRequestService(book,request)
                .then(function (response) {
                    for(var x in vm.requestedBooks){
                        if(vm.requestedBooks[x]===book){
                            vm.requestedBooks.splice(x,1);
                            break;
                        }
                    }
                },function (error) {

                });
        }
        function editBook(bookId) {
            document.getElementById('bookEditDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookUpdateDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookEditButtonDiv'+bookId).classList.toggle('hidden');
            document.getElementById('bookUpdateButtonDiv'+bookId).classList.toggle('hidden');
        }
        
        function updateBook(book) {
            var price=book.price;
            if(price==undefined || price==null || price=="" || parseInt(price)<0){
                book.price=0;

            }
            BookService
                .updateBookService(book,userId)
                .then(function (response) {
                    document.getElementById('bookEditDiv'+book._id).classList.toggle('hidden');
                    document.getElementById('bookUpdateDiv'+book._id).classList.toggle('hidden');
                    document.getElementById('bookEditButtonDiv'+book._id).classList.toggle('hidden');
                    document.getElementById('bookUpdateButtonDiv'+book._id).classList.toggle('hidden');
                },function (error) {

                });
        }
        
        function deleteBook(bookId) {
            // alert(bookId);
            BookService
                .deleteBookService(bookId,userId)
                .then(function (response) {
                    for(x in vm.booksAvailable){
                        if(bookId==vm.booksAvailable[x]._id){
                            vm.booksAvailable.splice(x,1);
                        }
                        break;
                    }
                    $route.reload();
                    // getBooksForUserId(userId);
                    // var books=response.data;
                    // var requestedBooks=[];
                    // var requestedForBooks=[];
                    // for (var x in books){
                    //     if(books[x].owner===userId && books[x].status==="requested"){
                    //         requestedBooks.push(books[x]);
                    //     }
                    //     if(books[x].currentlyWith===userId && books[x].status==="requested"){
                    //         requestedForBooks.push(books[x]);
                    //     }
                    // }
                    // // console.log("requestedBooks:"+requestedBooks);
                    // vm.requestedBooks=requestedBooks;
                    // // console.log("requestedForBooks:"+requestedForBooks);
                    // vm.requestedForBooks=requestedForBooks;
                    //
                    // var booksAvailable=[];
                    // var booksShared=[];
                    // for (var x in books){
                    //     if(books[x].owner===userId && books[x].status==="available"){
                    //         booksAvailable.push(books[x]);
                    //     }
                    //     if(books[x].currentlyWith===userId && books[x].status==="shared"){
                    //         booksShared.push(books[x]);
                    //     }
                    // }
                    // // console.log("requestedBooks:"+requestedBooks);
                    // vm.booksAvailable=booksAvailable;
                    // // console.log("requestedForBooks:"+requestedForBooks);
                    // vm.booksShared=booksShared;
                    // // getBooksRequestedForAndRequested(userId);
                    // // getUserBooksStats(userId);
                },function (error) {
                    vm.error="Unable to delete";
                });
        }

        function getBooksForUserId(userId) {
            BookService
                .findBooksOwnedAndBorrowedByUserId(userId)
                .then(function (response) {
                    // console.log(response.data);
                    var books=response.data;
                        var requestedBooks=[];
                        var requestedForBooks=[];
                        for (var x in books){
                            if(books[x].owner===userId && books[x].status==="requested"){
                                requestedBooks.push(books[x]);
                            }
                            if(books[x].currentlyWith===userId && books[x].status==="requested"){
                                requestedForBooks.push(books[x]);
                            }
                        }
                        // console.log("requestedBooks:"+requestedBooks);
                        vm.requestedBooks=requestedBooks;
                        // console.log("requestedForBooks:"+requestedForBooks);
                        vm.requestedForBooks=requestedForBooks;

                    var booksAvailable=[];
                    var booksShared=[];
                    for (var x in books){
                        if(books[x].owner===userId && books[x].status==="available"){
                            booksAvailable.push(books[x]);
                        }
                        // if(books[x].currentlyWith===userId && books[x].status==="shared"){
                        if(books[x].status==="shared"){
                            if(userId===books[x].owner){
                                books[x].returnField=1;
                            }
                            booksShared.push(books[x]);
                        }
                    }
                    // console.log("requestedBooks:"+requestedBooks);
                    vm.booksAvailable=booksAvailable;
                    // console.log("requestedForBooks:"+requestedForBooks);
                    vm.booksShared=booksShared;
                    // getBooksRequestedForAndRequested(userId);
                    // getUserBooksStats(userId);
                },function (error) {
                    // console.log("error:"+error);
                });
        }
        
        function init() {
            if($rootScope.currentUser.role==='user'){
            vm.message="";
            if(userId){
                vm.userId=userId;
            }
            vm.user = UserService.findUserById(userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
            getBooksForUserId(userId);}
            else{
                $rootScope.currentUser=null;
                $location.url('/login');
            }
        }

        init();

        function renderUser(user) {
            //console.log("haveli");
            vm.user = user;
        }

        function updateUser(newUser) {

            vm.message="";
            vm.error="";
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {

                    vm.message = "user successfully updated";
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        function deleteUser(userId) {
            UserService.deleteUser(userId);
            $location.url("/login");
        }

    }
})();
