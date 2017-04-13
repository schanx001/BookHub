(function () {
    angular
        .module("BookHubMaker")
        .config(configuration);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else {
                $location.url('/login');
            }
        });
    };


    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

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
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid/myalerts",{
                templateUrl:'views/user/templates/customer/stats/myAlerts.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/user/:uid/mystats",{
                templateUrl:'views/user/templates/customer/stats/myStats.view.client.html',
                controller:'profileController',
                controllerAs:'model'
            })
            .when("/user/:uid/addbook",{
                templateUrl:'views/user/templates/customer/stats/addBook.view.client.html',
                controller:'addBookController',
                controllerAs:'model'
            })
            .when("/organizer/:oid", {
                templateUrl: 'views/user/templates/organizerProfileEdit.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/organizer/:oid/addevent", {
                templateUrl: 'views/user/templates/organizerAddEvent.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/organizer/:oid/myevents", {
                templateUrl: 'views/user/templates/organizerMyEvents.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/organizer/:oid/eventdetails/:eid", {
                templateUrl: 'views/user/templates/eventDetails.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model'
            })
            .when("/seller/:sid", {
                templateUrl: 'views/user/templates/sellerProfileEdit.view.client.html',
                controller: 'sellerController',
                controllerAs: 'model'
            })
            .when("/seller/:sid/addbook", {
                templateUrl: 'views/user/templates/sellerAddBook.view.client.html',
                controller: 'sellerController',
                controllerAs: 'model'
            })
            .when("/admin/:aid",{
                templateUrl: 'views/user/templates/admin/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model'
            })
            .when("/admin/:aid/create",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/admin/:aid/manageEvents",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/admin/:aid/ManageBooks",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/admin/:aid/ManageUsers",{
                templateUrl: 'views/user/templates/admin/admin.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/admin/:aid/create",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model'
            })
            .when("/admin/:aid/updatecust/:uid",{
                templateUrl: 'views/user/templates/admin/updatecust.view.client.html',
                controller: 'adminController',
                controllerAs:'model'
            })

    }



})();
