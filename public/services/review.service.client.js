(function () {
    angular
        .module("BookHubMaker")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api={
            "getReviewsService":getReviewsService,
            "postReviewService":postReviewService
        };

        return api;

        function postReviewService(userId,review) {
            return $http.post("/api/review?userId="+userId,review);
        }

        function getReviewsService(bookId) {
            return $http.get("/api/review?bookId="+bookId);
        }
    }
})();
