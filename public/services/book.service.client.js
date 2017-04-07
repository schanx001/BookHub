(function () {
    angular
        .module("BookHubMaker")
        .factory("BookService",BookService);

    function BookService($http) {
        var api={
            "findAllAvBooks":findAllAvBooks,
            "findBooksByName":findBooksByName,
            "createBook":createBook,
            "findBooksOwnedAndBorrowedByUserId":findBooksOwnedAndBorrowedByUserId
        };
        return api;

        function createBook(book) {
            return $http.post("/api/book",book);
        }

        function findBooksOwnedAndBorrowedByUserId(userId) {
            return $http.get("/api/book?userId="+userId);
        }

        function findAllAvBooks(){
            return $http.get("/api/book");
        }

        function findBooksByName(bookName){
            return $http.get("/api/book?bookName="+bookName);
        }
    }

})();
