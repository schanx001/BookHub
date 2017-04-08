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
<<<<<<< HEAD
            // .when("/user/:uid", {
            //     templateUrl: 'views/user/templates/profileEdit.view.client.html',
            //     controller: 'profileController',
            //     controllerAs: 'model'
            // })
            .when("/user/:uid/myStats",{
=======
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profileEdit.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/myalerts",{
                templateUrl:'views/user/templates/stats/myAlerts.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/user/:uid/mystats",{
>>>>>>> origin/master
                templateUrl:'views/user/templates/stats/myStats.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/organizer/:uid/addEvent", {
                templateUrl: 'views/user/templates/OrganizerAddEvent.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/organizer/:uid/", {
                templateUrl: 'views/user/templates/organizerProfileEdit.view.client.html',
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
            .when("/seller/:uid", {
                templateUrl: 'views/user/templates/sellerProfileEdit.view.client.html',
                controller: 'sellerController',
                controllerAs: 'model'
            })
            .when("/seller/:uid/addBook", {
                templateUrl: 'views/user/templates/sellerAddBook.view.client.html',
                controller: 'sellerController',
                controllerAs: 'model'
            })
    }

})();
