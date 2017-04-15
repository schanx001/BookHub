/**
 * Created by shohitbajaj on 10/04/17.
 */

module.exports=function (app,model) {
    app.get("/api/book/:bookId", findBookByBookId);
    app.get("/api/books/:sellerId", findBooksBySellerId);
    /*app.post("/api/sellerbook/", addBook);
    */app.delete("/api/book/:bookId", deleteBook);
    app.put("/api/book/:sellerId", updateBook);
    app.get("/api/shop/:sellerId", findShopBySellerId);
    app.put("/api/shop/:sellerId", updateShopDetails);
    app.post("/api/shop/:sellerId", createShopDetails);



    //var bookModel = model.bookModel;
    var userModel = model.userModel;
    var sellerModel= model.sellerModel;
    var sellerBooksModel= model.sellerBooksModel;


    function updateShopDetails(req, res) {
        var sellerId = req.params['sellerId'];
        var newShop = req.body;
        sellerModel
            .updateShopDetailsInDb(sellerId,newShop)
            .then(function (response) {

                sellerModel
                    .findShopBySellerIdInDb(sellerId)
                    .then(function (response) {
                        res.json(response);
                    }, function () {
                        res.sendStatus(404);
                    })

            }, function () {
                res.sendStatus(404);
            });
    }


    function createShopDetails(req, res) {
        var sellerId = req.params['sellerId'];
        var newShop = req.body;
        sellerModel
            .createShopDetailsInDb(newShop)
            .then(function (response) {

                sellerModel
                    .findShopBySellerIdInDb(sellerId)
                    .then(function (response) {
                        res.json(response);
                    }, function () {
                        res.sendStatus(404);
                    })

            }, function () {
                res.sendStatus(404);
            });
    }


    function deleteBook(req, res) {
        var bookId = req.params.bookId;
        sellerBooksModel
            .deleteBookFromDb(bookId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    /*function addBook(req, res) {

        //console.log("Create User called");
        var book = req.body;
        console.log(book);
        // var newBook = {
        //     bookName: book.bookName,
        //     bookDescription: book.bookDescription,
        //     bookLocation: book.bookLocation,
        //     bookDate: book.bookDate,
        //     bookTime: book.bookTime
        // };

        sellerModel
            .addBook(book)
            .then(function (book) {
                res.send(book);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }*/

    function updateBook(req, res) {

        var sellerId = req.params['sellerId'];
        var newBook = req.body;
        sellerModel
            .updateBook(newBook)
            .then(function (response) {

                    sellerModel
                        .findBookByBookId(newBook._Id)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })

            }, function () {
                res.sendStatus(404);
            });
    }

    function findBookByBookId(req, res) {
        var bookId = req.params['bookId'];
        sellerModel
            .findBookByBookId(bookId)
            .then(function (book) {
                res.send(book);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findBooksBySellerId(req, res) {
        var sellerId = req.params['sellerId'];
        sellerBooksModel
            .findBooksBySellerId(sellerId)
            .then(function (books) {
                res.json(books);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findShopBySellerId (req, res) {
        var sellerId = req.params['sellerId'];
        sellerModel
            .findShopBySellerIdInDb(sellerId)
            .then(function (shop) {
               // console.log("shop="+shop);
                    res.json(shop);

            }, function (err) {
                res.sendStatus(404).send(err);

            });
    }



};
