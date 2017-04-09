/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("BookHubMaker")
        .controller("registerController", registerController);

    function registerController(UserService,$location,$rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user==null)
            {
                vm.error = "input empty! Please fill username and password";
            }
            else {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.error = "sorry that username is taken"
                    })
                    .error(function(){
                        /*UserService
                            .createUser(user)
                            .success(function(user){
                                //alert("welcome");
                                $location.url('/user/' + user._id);*/
                        alert("in register controller");
                        UserService
                            .register(user)
                            .then(function (response){
                                var user=response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/"+user._id);
                            });
                    });
            }}}
})();