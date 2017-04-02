/**
 * Created by shohitbajaj on 29/03/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            vm.message="";
            vm.user = UserService.findUserById(userId)
                .success(renderUser)
                .error(function () {
                    $location.url('/login');
                });
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