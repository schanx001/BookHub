/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("adminController", adminController);
    function adminController($routeParams, UserService, $location, $rootScope,$route,loggedin){
        var vm = this;
        vm.adminId = loggedin.data._id;//$routeParams['aid'];
        vm.allusers=null;
        vm.deleteUsers = deleteUsers;
        vm.updateUsers = updateUsers;
        vm.updatedUser = updatedUser;
        vm.logout = logout;
        function init() {
            UserService
                .getAllUsers()
                .then(function (users) {

                    //console.log(users);

                    vm.allusers = users.data;

                },
                function (err) {
                    vm.error = err;
                });
            vm.userId = $rootScope.userId;//$routeParams['uid'];
            if($rootScope.userId){
            vm.editUser = UserService.findUserById($rootScope.userId)
                .success(renderUser);
            }
        }
        init();
        function renderUser(user) {
            //console.log("haveli");

            vm.editUser = user;
        }


        function deleteUsers(userId,username) {
            var c = prompt("are you sure? you want to delete"+username)
//            alert(c);
            if(c.toString() ==='yes'){
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