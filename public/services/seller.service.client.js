/**
 * Created by shohitbajaj on 11/04/17.
 */

/**
 * Created by schanx on 3/27/17.
 */
(function(){
    angular
        .module("BookHubMaker")
        .factory("SellerService",SellerService);
    function SellerService($http) {
        var api = {
            "addBook":addBook,
            "updateBook": updateBook,
            //"findUserByCredentials": findUserByCredentials,
            "findBookByBookId": findBookByBookId,
            //"findUserByUsername": findUserByUsername,
            "deleteBook":deleteBook,
            "findBooksBySellerId": findBooksBySellerId,
            "findShopBySellerId" : findShopBySellerId,
            "updateShopDetails" : updateShopDetails,
            "createShopDetails": createShopDetails
            //"login" : login,
            //"logout" : logout,
            //"register":register
        };
        return api;

        function deleteBook(bookId) {
            return $http.delete("/api/book/"+bookId);
        }

        function addBook(book) {
            return $http.post("/api/book/", book);
        }


        function updateBook(sellerId, newBook) {
            return $http.put("/api/book/"+sellerId, newBook);
        }

        function findBookByBookId(bid) {
            return $http.get("/api/book/"+bid);
        }

        function findBooksBySellerId(sid) {
            return $http.get("/api/books/"+sid);
        }

        function findShopBySellerId(sellerId) {
            return $http.get("/api/shop/"+sellerId);
        }

        function updateShopDetails(sellerId, newShop) {
            return $http.put("/api/shop/"+sellerId, newShop);
        }

        function createShopDetails(sellerId, newShop) {
           // alert(newShop.shopEmail + " hello  " + newShop.shopPhone );
            return $http.post("/api/shop/"+sellerId, newShop);
        }
    }
})();