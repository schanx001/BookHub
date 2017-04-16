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
        vm.processAuthor = processAuthor;


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
            return url.replace("edge=curl&","");/*("zoom=1","zoom=0").*/
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

            BookService
                .createBook({
                    owner:vm.userId,
                    title:bookToAdd.volumeInfo.title,
                    author:processAuthor(bookToAdd.volumeInfo.authors),
                    price:document.getElementById('bookprice'+bookToAdd.id).value,
                    notes:document.getElementById('bookdesc'+bookToAdd.id).value,
                    averageRating:0.0,
                    ratingCount:0,
                    description:bookToAdd.volumeInfo.description,
                    imgsrc:bookToAdd.volumeInfo.imageLinks.smallThumbnail,
                    imglrgsrc:bookToAdd.volumeInfo.imageLinks.thumbnail,/*processImage(bookToAdd.volumeInfo.imageLinks.thumbnail),*///add
                    currentlyWith:vm.userId,
                    status:"available"})
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
                    alert("Your book has not been added");

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
