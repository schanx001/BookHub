/**
 * Created by shohitbajaj on 26/03/17.
 */


(function () {
    angular
        .module("BookHubMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: 'views/main/templates/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'model'
            })
    }

})();