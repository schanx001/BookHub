/**
 * Created by shohitbajaj on 29/03/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, BookService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.requestedBooks=[];
        vm.requestedForBooks=[];
        vm.booksAvailable=[];
        vm.booksShared=[];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        // vm.getBooksRequestedForAndRequested=getBooksRequestedForAndRequested;
        // vm.getUserBooksStats="";
        vm.booksForUserId=null;

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
                        if(books[x].currentlyWith===userId && books[x].status==="shared"){
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

        // function getUserBooksStats(userId) {
        //     var books=vm.booksForUserId;
        //     var booksAvailable=[];
        //     var booksShared=[];
        //     for (var x in books){
        //         if(books[x].owner===userId && books[x].status==="available"){
        //             booksAvailable.push(books[x]);
        //         }
        //         if(books[x].currentlyWith===userId && books[x].status==="shared"){
        //             booksShared.push(books[x]);
        //         }
        //     }
        //     // console.log("requestedBooks:"+requestedBooks);
        //     vm.booksAvailable=booksAvailable;
        //     // console.log("requestedForBooks:"+requestedForBooks);
        //     vm.booksShared=booksShared;
        // }
        //
        //
        // function getBooksRequestedForAndRequested(userId) {
        //     var books=vm.booksForUserId;
        //     var requestedBooks=[];
        //     var requestedForBooks=[];
        //     for (var x in books){
        //         if(books[x].owner===userId && books[x].status==="requested"){
        //             requestedBooks.push(books[x]);
        //         }
        //         if(books[x].currentlyWith===userId && books[x].status==="requested"){
        //             requestedForBooks.push(books[x]);
        //         }
        //     }
        //     // console.log("requestedBooks:"+requestedBooks);
        //     vm.requestedBooks=requestedBooks;
        //     // console.log("requestedForBooks:"+requestedForBooks);
        //     vm.requestedForBooks=requestedForBooks;
        //     // BookService
        //     //     .findBooksOwnedAndBorrowedByUserId(userId)
        //     //     .then(function (response) {
        //     //         // console.log(response);
        //     //         var books=response.data;
        //     //         var requestedBooks=[];
        //     //         var requestedForBooks=[];
        //     //         for (var x in books){
        //     //             if(books[x].owner===userId && books[x].status==="requested"){
        //     //                 requestedBooks.push(books[x]);
        //     //             }
        //     //             if(books[x].currentlyWith===userId && books[x].status==="requested"){
        //     //                 requestedForBooks.push(books[x]);
        //     //             }
        //     //         }
        //     //         // console.log("requestedBooks:"+requestedBooks);
        //     //         vm.requestedBooks=requestedBooks;
        //     //         // console.log("requestedForBooks:"+requestedForBooks);
        //     //         vm.requestedForBooks=requestedForBooks;
        //     //     },function (error) {
        //     //         // console.log("error:"+error);
        //     //     });
        // }
        
        function init() {
            vm.message="";
            vm.user = UserService.findUserById(userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
            getBooksForUserId(userId);
        }

        init();

        function renderUser(user) {
            //console.log("haveli");

            vm.user = user;
        }

        function updateUser(newUser) {

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