module.exports = function(){

    var model = null;
    var mongoose = require("mongoose");
    var sellerSchema ;//= require('./user.schema.server.js')();
    var sellerModel ;//= mongoose.model('userModel',userSchema);

    var api = {
        "addBook":addBook,
        "updateBook": updateBook,
        "findBookByBookId": findBookByBookId,
        "findBooksBySellerId": findBooksBySellerId,
        "deleteBook":deleteBook,
        "setModel":setModel,
        "getModel":getModel,
        "findShopBySellerIdInDb": findShopBySellerIdInDb,
        //"updateShopDetails": updateShopDetails,
        "updateShopDetailsInDb": updateShopDetailsInDb,
        "createShopDetailsInDb": createShopDetailsInDb
    };
    return api;

    function findShopBySellerIdInDb(sid) {
        //console.log(sid +"hellooo");
        return sellerModel.findOne({owner : sid});
    }
    function getModel() {
        return sellerModel;
    }
    function addBook(book){
        return sellerModel.create(book);
    }

    function findBookByBookId(bookId){
        return sellerModel.findById(bookId);
    }

    function findBooksBySellerId(sellerId){
        return sellerModel.find({owner:sellerId});
    }

    function updateBook(updatedBook){
        return sellerModel.update({_id:updatedBook._id},{$set:updatedBook});
    }

    function updateShopDetailsInDb(sid, newShop){
        //console.log(sid);
      //  console.log(newShop.owner);
      //  console.log("hqehdoqdh");

        return sellerModel.update({owner:sid},{$set:newShop});
        //return sellerModel.create(newShop);
    }

    function createShopDetailsInDb(newShop){
        //console.log(sid)

        return sellerModel.create(newShop);
        //return sellerModel.create(newShop);
    }

    function deleteBook(bookId){
        return sellerModel.findByIdAndRemove(bookId, function (err,book) {
            if(book!=null){
                book.remove();
            }
        });
    }

    function  setModel(_model){
        model=_model;
        sellerSchema = require("./seller.schema.server")(model);
        sellerModel = mongoose.model("sellerModel", sellerSchema);
    }
};
