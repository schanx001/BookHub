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
                templateUrl: 'views/main/templates/mainPage.view.client.html',
                controller: 'mainPageController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/booksearch", {
                templateUrl: 'views/bookSearch/templates/bookSearch.view.client.html',
                controller: 'bookSearchController',
                controllerAs: 'model'
            })
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profileEdit.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/mystat",{
                templateUrl:'views/user/templates/stats/mystat.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/organizer", {
                templateUrl: 'views/user/templates/organizer.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/admin",{
                templateUrl: 'views/user/templates/admin/admin.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })
            .when("/admin/create",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })

            .when("/admin/manageBooks",{
                templateUrl: 'views/user/templates/admin/manageBooks.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })

            .when("/admin/manageEvents",{
                templateUrl: 'views/user/templates/admin/manageEvents.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })

            .when("/admin/manageSellers",{
                templateUrl: 'views/user/templates/admin/manageSellers.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })

            .when("/admin/handleRequests",{
                templateUrl: 'views/user/templates/admin/handleRequests.view.client.html',
                controller: 'adminController',
                comtrollerAs: 'model'
            })
    }

})();
