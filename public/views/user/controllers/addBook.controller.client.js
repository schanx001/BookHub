(function () {
    angular
        .module("BookHubMaker")
        .controller("addBookController",addBookController)

    function addBookController($http,$routeParams,BookService,loggedin,UserService,$rootScope,$location) {

        var vm = this;
        vm.searchBook=searchBook;
        vm.addBook=addBook;
        vm.userId=loggedin.data._id;//$routeParams['uid'];
        vm.bookPrice=0;
        vm.bookTitle="";
        vm.bookNotes="";
        vm.logout = logout;
        vm.processImage= processImage;


        function processImage(url) {
            var temp;
            return url.replace("zoom=1","zoom=0").replace("edge=curl&","");
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }

        function addBook(bookToAdd) {
            // alert("book");
            BookService
                .createBook({
                    owner:vm.userId,
                    title:bookToAdd.volumeInfo.title,
                    author:bookToAdd.volumeInfo.authors[0],
                    price:vm.bookPrice,
                    notes:vm.bookNotes,
                    averageRating:0.0,
                    ratingCount:0,
                    description:bookToAdd.volumeInfo.description,
                    imgsrc:bookToAdd.volumeInfo.imageLinks.smallThumbnail,
                    imglrgsrc:processImage(bookToAdd.volumeInfo.imageLinks.thumbnail),//add
                    currentlyWith:vm.userId,
                    status:"available"})
                .then(function (response) {
                    alert("your book has been added/shared");
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
                })
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
