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
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/profile", {
                templateUrl: 'views/user/templates/profileEdit.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/myalerts",{
                templateUrl:'views/user/templates/customer/stats/myAlerts.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/mystats",{
                templateUrl:'views/user/templates/customer/stats/myStats.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/addbook",{
                templateUrl:'views/user/templates/customer/stats/addBook.view.client.html',
                controller:'addBookController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/organizer/profile", {
                templateUrl: 'views/user/templates/organizerProfileEdit.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/organizer/addevent", {
                templateUrl: 'views/user/templates/organizerAddEvent.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/organizer/myevents", {
                templateUrl: 'views/user/templates/organizerMyEvents.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/organizer/eventdetails/event", {
                templateUrl: 'views/user/templates/eventDetails.view.client.html',
                controller: 'organizerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/seller/profile", {
                templateUrl: 'views/user/templates/sellerProfileEdit.view.client.html',
                controller: 'sellerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/seller/addbook", {
                templateUrl: 'views/user/templates/sellerAddBook.view.client.html',
		        controller: 'sellerAddBookController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }

           	})
        	.when("/seller/myinventory", {
                templateUrl: 'views/user/templates/sellerMyInventory.view.client.html',          
                controller: 'sellerController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/profile",{
                templateUrl: 'views/user/templates/admin/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/create",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/manageEvents",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/manageSellers",{
                templateUrl: 'views/user/templates/admin/manageSellers.view.client.html',
                controller: 'registerController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/manageBooks",{
                templateUrl: 'views/user/templates/admin/createUser.view.client.html',
                controller: 'registerController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/ManageUsers",{
                templateUrl: 'views/user/templates/admin/admin.view.client.html',
                controller: 'registerController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin/updatecust/cust",{
                templateUrl: 'views/user/templates/admin/updatecust.view.client.html',
                controller: 'adminController',
                controllerAs:'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/bookdetails/book",{
                templateUrl:'views/bookSearch/templates/bookDetails.view.client.html',
                controller:'bookDetailsController',
                controllerAs:'model'
            })
    }



})();
