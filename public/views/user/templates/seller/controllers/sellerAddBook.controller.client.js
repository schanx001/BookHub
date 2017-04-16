(function () {
    angular
        .module("BookHubMaker")
        .controller("sellerAddBookController",sellerAddBookController);

    function sellerAddBookController($http,$routeParams, UserService ,SellerBooksService,loggedin, $rootScope, $location) {

        var vm = this;
        vm.searchBook=searchBook;
        vm.addBook=addBook;
        vm.userId=loggedin.data._id;//$routeParams['sid'];
        vm.bookPrice=0;
        vm.bookTitle="";
        vm.bookDescription="";
        vm.processImage= processImage;
        vm.logout=logout;
        vm.processAuthor=processAuthor;

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        function processAuthor(author) {
            alert(author);
            if(author==null || author==undefined || author.length==0){

                return "Author not listed";

            }
            else{
                return author;
            }
        }
        function processImage(url) {
            var temp;
            return url.replace("edge=curl&","");
        }

        function addBook(bookToAdd) {
            //alert(processImage(bookToAdd.volumeInfo.imageLinks.thumbnail));
            SellerBooksService
                .createBook({
                    owner:vm.userId,
                    title:bookToAdd.volumeInfo.title,
                    author:processAuthor(bookToAdd.volumeInfo.authors),
                    price:document.getElementById('sellerbookprice'+bookToAdd.id).value,//vm.bookPrice,
                    description:document.getElementById('sellerbookdesc'+bookToAdd.id).value,
                    imgsrc:bookToAdd.volumeInfo.imageLinks.smallThumbnail ,
                    imglrgsrc : processImage(bookToAdd.volumeInfo.imageLinks.thumbnail)})
                .then(function (response) {
                    alert("Your book has been added");

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
