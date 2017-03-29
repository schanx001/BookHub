(function () {
    angular
        .module("BookHubMaker")
        .factory("BookSearchService",BookSearchService);

    function BookSearchService($http) {
        var api={
            "findBooksByName":findBooksByName
        };
        return api;

        function findBooksByName(bookName){
            return $http.post("/api/book?bookName="+findBooksByName);
        }
    }

})();
