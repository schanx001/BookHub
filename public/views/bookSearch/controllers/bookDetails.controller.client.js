(function () {
    angular
        .module("BookHubMaker")
        .controller("bookDetailsController",bookDetailsController)
    
    function bookDetailsController(UserService,BookService,ReviewService,$routeParams,UserService,$rootScope,$location) {
        var vm=this;
        vm.book=null;
        vm.comment=null;
        vm.userId=null;
        vm.reviews=[];
        vm.userRating=null;
        vm.newRating=null;
        vm.getBook=getBook;
        vm.getReviews=getReviews;
        vm.postReview=postReview;
        vm.getUserRating=getUserRating;
        vm.setUserRating=setUserRating;
        vm.checkUser = checkUser;
        vm.user = null;
        function checkUser() {
            if(loggedin){
                $location.url("/user/profile");
            }
            else{

                $location.url("/");
            }
        }

        function setUserRating(bookId) {
            if(vm.newRating){
                UserService
                    .setUserRating(vm.userId,bookId,vm.newRating)
                    .then(function (response) {
                        vm.userRating=vm.newRating;
                        vm.book.averageRating=response.data.averageRating;
                        vm.book.ratingCount=response.data.ratingCount;
                    },function (error) {
                        
                    });
            }
        }
        
        function getUserRating(userId,bookId) {
            UserService
                .getUserRatingService(userId,bookId)
                .then(function (response) {
                    vm.userRating=response.data;
                },function (error) {
                    
                });
        }

        function postReview() {
            if(vm.comment){
                var review={};
                review.bookId=vm.book._id;
                review.comment=vm.comment;
                ReviewService
                    .postReviewService(vm.userId,review)
                    .then(function (response) {
                        vm.reviews.splice(0,0,response.data);
                    },function (error) {
                        
                    });
            }
        }

        function getReviews(bookId) {
            ReviewService
                .getReviewsService(bookId)
                .then(function (response) {
                    vm.reviews=response.data;
                },function (error) {

                });
        }

        function init() {

            UserService
                .findCurrentUser()
                .then(function (response) {
                    vm.user = response.data;
                    vm.userId=response.data._id;
                    var bookId=$routeParams['bookId'];
                    if(bookId){
                        getBook(bookId);
                        getReviews(bookId);
                        getUserRating(vm.userId,bookId);
                    }

                });

 //vm.userId=$routeParams.uid;
   //         var bookId=$routeParams.bid;
            //vm.userId=loggedin.data._id;

        }
        init();

        function getBook(bookId) {
            BookService
                .findBookById(bookId)
                .then(function (response) {
                    vm.book=response.data;
                },function (error) {
                    
                });
            
        }
    }
    
})();
