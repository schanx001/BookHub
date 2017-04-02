(function () {
    angular
        .module("BookHubMaker")
        .factory("BookService",BookService);

    function BookService($http) {
        var api={
            "findAllAvBooks":findAllAvBooks,
            "findBooksByName":findBooksByName,
            "createBook":createBook
        };
        return api;

        function createBook(book) {
            return $http.post("/api/book",book);
        }

        function findAllAvBooks(){
            return $http.get("/api/book");
        }

        function findBooksByName(bookName){
            return $http.post("/api/book?bookName="+findBooksByName);
        }
    }

})();
