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
            .when("/register",{
                templateUrl: 'views/user/template/register.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/login", {
                templateUrl: 'views/main/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
    }

})();
