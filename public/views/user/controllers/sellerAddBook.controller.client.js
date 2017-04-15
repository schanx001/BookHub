(function () {
    angular
        .module("BookHubMaker")
        .controller("sellerAddBookController",sellerAddBookController);

    function sellerAddBookController($http,$routeParams,SellerBooksService,loggedin) {

        var vm = this;
        vm.searchBook=searchBook;
        vm.addBook=addBook;
        vm.userId=loggedin.data._id;//$routeParams['sid'];
        vm.bookPrice=0;
        vm.bookTitle="";
        vm.bookDescription="";

        function addBook(bookToAdd) {
            // alert("book");
            SellerBooksService
                .createBook({
                    owner:vm.userId,
                    title:bookToAdd.volumeInfo.title,
                    author:bookToAdd.volumeInfo.authors[0],
                    price:document.getElementById('sellerbookprice'+bookToAdd.id).value,//vm.bookPrice,
                    description:document.getElementById('sellerbookdesc'+bookToAdd.id).value,
                    imgsrc:bookToAdd.volumeInfo.imageLinks.smallThumbnail})
                .then(function (response) {
                    // console.log("addbook="+response.data);
                    // vm.books=[];
                    // if(document.getElementById("div_book_listing")){
                    //     document.getElementById("div_book_listing").innerHTML="";
                    // }
                    // if(document.getElementById("div_book_listing_mobile")){
                    //     document.getElementById("div_book_listing_mobile").innerHTML="";
                    // }
                    // getAllAvBooks();
                },function (error) {
                    // console.log("addbookerror="+error);
                });
        }

        function searchBook() {
            // console.log("Inside");
            vm.books=[];
            var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+vm.bookTitle;
            var gbooks=$http.get(googleAPI);
            if(document.getElementById("div_book_listing")){
                document.getElementById("div_book_listing").innerHTML="";
            }
            // if(document.getElementById("div_book_listing_mobile")){
            //     document.getElementById("div_book_listing_mobile").innerHTML="";
            // }
            gbooks.then(function(response){
                // console.log(response.data);
                for( var i=0;i<response.data.items.length;i++){
                    vm.books.push(response.data.items[i]);
                }
                // console.log(vm.books);
                // console.log(vm.books[0].kind);
                // console.log(vm.books[0].volumeInfo.title);
            },function (response) {
                // console.log(response);

            });
        }

    }
})();