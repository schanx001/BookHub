/**
 * Created by schanx on 4/1/17.
 */
(function () {
    angular
        .module("BookHubMaker")
        .controller("adminController", adminController);
    function adminController($routeParams, UserService, $location, $rootScope,$route){
        var vm = this;
        vm.adminId = $routeParams['aid'];
        vm.allusers=null;
        vm.deleteUsers = deleteUsers;
        vm.updateUsers = updateUsers;
        vm.updatedUser = updatedUser;
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

            vm.userId = $routeParams['uid'];
            if(vm.userId){
            vm.editUser = UserService.findUserById(vm.userId)
                .success(renderUser);}
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
                $location.redirect("/admin/"+vm.adminId);
            }
        }
        function updateUsers(newUser) {
            $location.url("/admin/"+vm.adminId+"/updatecust/"+newUser._id);
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
        function updatedUser(newUser) {
            alert('hello')
            var userId = vm.userId;
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    $location.url("/admin/"+vm.adminId);
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();