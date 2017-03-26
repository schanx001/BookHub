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
                templateUrl: 'main/mainPage.html'
                //controller: 'loginController',
                //controllerAs: 'model'
            })
    }

})();