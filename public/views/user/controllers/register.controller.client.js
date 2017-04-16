/**
 * Created by schanx on 2/14/17.
 */
(function(){
    angular
        .module("BookHubMaker")
        .controller("registerController", registerController);

    function registerController(UserService,$location,$rootScope,$routeParams) {
        var vm = this;
        vm.register = register;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        function register(user) {
            vm.error="";
            vm.message="";
            if(user.username==null) {
                vm.error = "input empty! Please fill username";
                return;
            }
            if(user.password==null)
            {
                vm.error = "input empty! Please fill password";
                return;
            }
            if(user.email== undefined || user.email== null) {
                vm.error = "Please fill email in correct format";
                return;

            }
            if(user.phone.toString().length != 10){

                vm.error = "Phone number should be 10 digits";
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
                        UserService
                            .register(user)
                            .then(function (response){
                                var user=response.data;
                                //alert(vm.flag);
                                if(vm.flag==='adminflag'){
                                    var aid = $routeParams['aid'];
                                    $location.url("/admin/profile");
                                }
                                    else{
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
                                }}
                            });
                    });
            }}}
})();
