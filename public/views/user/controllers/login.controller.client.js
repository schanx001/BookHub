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
                        if(user.role.toString() === 'user') {
                            alert("hell");
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        }
                        else if(user.role.toString() === 'eventorganizer') {
                            alert("hell2");
                            $rootScope.currentUser = user;
                            $location.url("/organizer/" + user._id);
                        }
                        else if(user.role.toString() === 'seller') {
                            $rootScope.currentUser = user;
                            $location.url("/seller/" + user._id);
                        }

                    },function (err) {
                        vm.error = "user/password does not match";
                    });
            }
        }
    }
})();