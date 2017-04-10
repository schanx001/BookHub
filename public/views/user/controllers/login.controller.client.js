/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("loginController", loginController);


    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;


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
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    },function (err) {
                        vm.error = "user/password does not match";
                    });
            }
        }
    }
})();