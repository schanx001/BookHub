(function () {
    angular
        .module("BookHubMaker")
        .factory("BookService",BookService);

    function BookService($http) {
        var api={
            "findAllAvBooks":findAllAvBooks,
            "findBooksByName":findBooksByName,
            "createBook":createBook,
            "findBooksOwnedAndBorrowedByUserId":findBooksOwnedAndBorrowedByUserId,
            "deleteBookService":deleteBookService,
            "updateBookService":updateBookService
        };
        return api;

        function updateBookService(book,userId) {
            return $http.put("/api/book?userId="+userId,book);
        }

        function deleteBookService(bookId,userId) {
            return $http.delete("/api/book?bookId="+bookId+"&userId="+userId);
        }

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
