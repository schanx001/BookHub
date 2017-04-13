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
                        UserService
                            .register(user)
                            .then(function (response){
                                var user=response.data;
                                alert(vm.flag);
                                if(vm.flag==='adminflag'){
                                    var aid = $routeParams['aid'];
                                    $location.url("/admin/profile");
                                }
                                    else{
                                if(user.role.toString() === 'user') {
                                    alert("hell");
                                    $rootScope.currentUser = user;
                                    $location.url("/user/profile");// + user._id);
                                }
                                else if(user.role.toString() === 'eventorganizer') {
                                    alert("hell2");
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