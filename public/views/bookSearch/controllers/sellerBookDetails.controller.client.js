/**
 * Created by shohitbajaj on 14/04/17.
 */

(function () {
    angular
        .module("BookHubMaker")
        .controller("sellerBookDetailsController",sellerBookDetailsController)

    function sellerBookDetailsController(SellerBooksService,$routeParams) {
        var vm=this;
        // vm.userId=null;
        vm.getSellerBook=getSellerBook;

        function init() {
            // vm.userId=$routeParams.uid;

            var sid=$routeParams['sellerBookId'];

            if(sid){

                // getBook(bookId);
                // getReviews(bookId);
                // getUserRating(vm.userId,bookId);
                getSellerBook(sid);
            }
        }
        init();

        function getSellerBook(bookId) {
            SellerBooksService
                .findSellerAndBookDetails(bookId)
                .then(function (response) {
                    vm.sellerbook=response.data;
                },function (error) {

                });

        }
    }

})();