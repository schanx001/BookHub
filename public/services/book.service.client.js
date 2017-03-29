(function () {
    angular
        .module("BookHubMaker")
        .factory("BookService",BookService);

    function BookService($http) {
        var api={
            "findBooksByName":findBooksByName
        };
        return api;

        function findBooksByName(bookName){
            return $http.post("/api/book?bookName="+findBooksByName);
        }
    }

})();
