/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("loginController", loginController);


    function loginController(UserService, $location, $rootScope, loggedin) {
        var vm = this;
        vm.login = login;

        function init() {
        }
        init();
        function login(user) {
            if(user==null)
            {
                vm.error = "please fill in the username and password";
            }
            else {
                var promise = UserService.login(user);
                promise
                    .then(function (response) {
                        var user = response.data;
                        if(user.role.toString() === 'user') {

                            $rootScope.currentUser = user;
                            $location.url("/user/profile");// + user._id);
                        }
                        else if(user.role.toString() === 'eventorganizer') {

                            $rootScope.currentUser = user;
                            $location.url("/organizer/profile");// + user._id);
                        }
                        else if(user.role.toString() === 'seller') {
                            $rootScope.currentUser = user;
                            $location.url("/seller/profile");// + user._id);
                        }
                        else if(user.role.toString() === 'admin') {
                            $rootScope.currentUser = user;
                            $location.url("/admin/profile");//+ user._id);
                        }



                    },function (err) {
                        vm.error = "user/password does not match";
                    });
            }
        }
    }
})();