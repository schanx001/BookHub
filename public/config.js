/**
 * Created by shohitbajaj on 26/03/17.
 */


(function () {
    angular
        .module("BookHubMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: 'views/main/templates/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'model'
            })
<<<<<<< HEAD
            .when("/register",{
                templateUrl: 'views/user/template/register.view.client.html',
                controller: 'registerController',
=======
            .when("/login", {
                templateUrl: 'views/main/user/templates/login.view.client.html',
                controller: 'loginController',
>>>>>>> eb11ecd6ef78a09ab2521bf357f766b99f1288d2
                controllerAs: 'model'
            })
    }

})();