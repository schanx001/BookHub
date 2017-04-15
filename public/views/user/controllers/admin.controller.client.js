/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("adminController", adminController);
    function adminController($routeParams, UserService, BookService, $location, $rootScope,$route,loggedin,OrganizerService){
        var vm = this;
        vm.adminId = loggedin.data._id;//$routeParams['aid'];
        vm.allusers=null;
        vm.deleteUsers = deleteUsers;
        vm.updateUsers = updateUsers;
        vm.updatedUser = updatedUser;
        vm.logout = logout;
        vm.getBooksHelper=getBooksHelper;
        vm.deleteBook = deleteBook;
        vm.deleteEvent = deleteEvent;
        vm.allevents = null;
        vm.allbooks=null;
        function init() {
            if($rootScope.currentUser.role==='admin') {
                UserService
                    .getAllUsers()
                    .then(function (users) {

                            vm.allusers = users.data;

                        },
                        function (err) {
                            vm.error = err;
                        });
                getBooksHelper();
                getEventsHelper();
                vm.userId = $rootScope.userId;//$routeParams['uid'];
                if ($rootScope.userId) {
                    vm.editUser = UserService.findUserById($rootScope.userId)
                        .success(renderUser);
                }
            }else{
                $rootScope.currentUser=null;
                $location.url('/login');
            }
        }

        //                     vm.allusers = users.data;
        //
        //                 },
        //                 function (err) {
        //                     vm.error = err;
        //                 });
        //         getBooksHelper();
        //         getEventsHelper();
        //         vm.userId = $rootScope.userId;//$routeParams['uid'];
        //         if ($rootScope.userId) {
        //             vm.editUser = UserService.findUserById($rootScope.userId)
        //                 .success(renderUser);
        //         }
        //     }else{
        //         $rootScope.currentUser=null;
        //         $location.url('/login');
        //     }
        // }

        init();

        function getEventsHelper() {
            OrganizerService
                .getAllEvents()
                .then(function (events) {
                    vm.allevents=events.data;
                },function (err) {
                    vm.error = err;
                });
        }

        function getBooksHelper() {

            BookService
                .getAllBooks()
                .then(function (books){
                                vm.allbooks = books.data;
                                // var userIds=[];
                                // for(i in vm.allbooks){
                                //     userIds.push(vm.allbooks[i].owner);
                                // }
                                // UserService
                                //     .findAllUserNames(userIds)
                                //     .then(function (responseNew) {
                                //         for()
                                //     },function (error) {
                                //
                                //     });
                    },
                    function (err) {
                        vm.error = err;
                    });
        }

        function deleteEvent(event) {
            OrganizerService
                .deleteEvent(event._id)
                .then(function () {
                    for(x in vm.allevents){
                        if(vm.allevents[x]._id==event._id){
                            vm.allevents.splice(x,1);
                        }
                        break;
                    }
                });
        }

        function deleteBook(book) {
            if(book.status==='available'){
            if(confirm("are you sure")){
                BookService.deleteBookService(book._id,book.owner)
                    .then(function () {
                        // $route.reload();
                        for(x in vm.allbooks){
                            if(vm.allbooks[x]._id==book._id){
                                vm.allbooks.splice(x,1);
                            }
                            break;
                        }
                    });}
            else{
                $location.redirect("/admin/manageBooks");//+vm.adminId);
            }}else{
                    alert("cant delete a book which shared/requested!");
                }
        }


        // function getBooksHelper() {
        //
        //     BookService
        //         .getAllBooks()
        //         .then(function (books){
        //                         vm.allbooks = books.data;
        //                         // var userIds=[];
        //                         // for(i in vm.allbooks){
        //                         //     userIds.push(vm.allbooks[i].owner);
        //                         // }
        //                         // UserService
        //                         //     .findAllUserNames(userIds)
        //                         //     .then(function (responseNew) {
        //                         //         for()
        //                         //     },function (error) {
        //                         //
        //                         //     });
        //             },
        //             function (err) {
        //                 vm.error = err;
        //             });
        // }
        //
        // function deleteEvent(event) {
        //     OrganizerService
        //         .deleteEvent(event._id)
        //         .then(function () {
        //             for(x in vm.allevents){
        //                 if(vm.allevents[x]._id==event._id){
        //                     vm.allevents.splice(x,1);
        //                 }
        //                 break;
        //             }
        //         });
        // }

        // function deleteBook(book) {
        //     if(book.status==='available'){
        //     if(confirm("are you sure")){
        //         BookService.deleteBookService(book._id,book.owner)
        //             .then(function () {
        //                 // $route.reload();
        //                 for(x in vm.allbooks){
        //                     if(vm.allbooks[x]._id==book._id){
        //                         vm.allbooks.splice(x,1);
        //                     }
        //                     break;
        //                 }
        //             });}
        //     else{
        //         $location.redirect("/admin/manageBooks");//+vm.adminId);
        //     }}else{
        //             alert("cant delete a book which shared/requested!");
        //         }
        // }

        function renderUser(user) {
            //console.log("haveli");
            vm.editUser = user;
        }


        function deleteUsers(userId,username) {
            if(confirm('are you sure?')){
            UserService.deleteUser(userId)
                .then(function () {
                    $route.reload();
                    /*
                    $location.redirect("/admin/"+vm.adminId);*/
                });}
                else{
                $location.redirect("/admin/profile");//+vm.adminId);
            }
        }
        function updateUsers(newUser) {
            if(newUser){
                $rootScope.userId = newUser._id;
            }
            $location.url("/admin/updatecust/cust");
/*
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {

                    vm.message = "user successfully updated";
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
*/
        }
        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        function updatedUser(newUser) {

            var userId = vm.userId;
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    $location.url("/admin/profile");//+vm.adminId);
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();
