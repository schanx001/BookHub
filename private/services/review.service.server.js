module.exports=function (app,model) {
    app.get("/api/review", findReviews);
    app.post("/api/review", createReview);

    var reviewModel = model.reviewModel;
    var userModel = model.userModel;

    function findReviews(req,res) {
        var bookId=req.query.bookId;
        var userId=req.query.userId;
        if(bookId!=undefined){
            reviewModel
                .findReviewsByBookIdInDb(bookId)
                .then(function (response) {
                    res.send(response);
                },function (error) {
                    res.sendStatus(404);
                });
        }else if(userId!=undefined){
            userModel
                .findUserById(userId)
                .then(function (response) {
                    reviewModel
                        .findReviewsByUserNameInDb(response.username)
                        .then(function (response) {
                            res.send(response);
                        },function (error) {
                            res.sendStatus(404);
                        });
                },function (error) {
                    res.sendStatus(404);
                });
        }else{
            res.sendStatus(404);
        }
    }

    function createReview(req,res) {
        var userId=req.query.userId;
        if(userId!=undefined){
            var review=req.body;
            userModel
                .findUserById(userId)
                .then(function (response) {
                    // console.log("Workins");
                    review.commentor=response.username;
                    // console.log(review.commentor+" "+review.comment+" "+review.bookId);
                    reviewModel
                        .createReviewInDb(review)
                        .then(function (response) {
                            // console.log(response);
                            res.send(response);
                        },function (error) {
                            res.sendStatus(404);
                        });
                },function (error) {
                    res.sendStatus(404);
                });
        }else{
            res.sendStatus(404);
        }
    }
};
