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
            "updateBookService":updateBookService,
            "acceptRequestService":acceptRequestService,
            "requestBookService":requestBookService,
            "bookReturnedService":bookReturnedService,
            "findBookById": findBookById,
            "getAllBooks" : getAllBooks
        };
        return api;

        function getAllBooks() {
            return $http.get("/api/getbooks");
        }

        function findBookById(bookId) {
            return $http.get("/api/book?bookId="+bookId);
        }

        function bookReturnedService(book) {
            return $http.put("/api/book?bookReturned="+book._id,book);
        }

        function requestBookService(bookId,userId) {
            return $http.put("/api/book?requestBook="+bookId+"&requestorId="+userId);
        }

        function acceptRequestService(book,request) {
            return $http.put("/api/book?acceptRequest="+request,book);
        }

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
