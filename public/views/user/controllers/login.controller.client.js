/**
 * Created by shohitbajaj on 07/02/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        function login(user) {
            if(user==null)
            {
                vm.error = "please fill in the username and password";
            }
            else {
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (user) {
                        if (user) {
                            //alert("welcome");
                            $location.url('/user/' + user._id);
                        } else {
                            vm.error = 'user not found';
                        }
                    })
                    .error(function (err) {
                        vm.error = "user not found";
                    });
            }
        }
    }
})();