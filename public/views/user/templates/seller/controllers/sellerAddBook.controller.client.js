(function () {
    angular
        .module("BookHubMaker")
        .controller("sellerAddBookController",sellerAddBookController);

    function sellerAddBookController($http,$routeParams,SellerBooksService,loggedin, UserService, $rootScope, $location) {

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
            var price=document.getElementById('sellerbookprice'+bookToAdd.id).value
            if(price==undefined || price==null || price=="" || parseInt(price)<0){
                price=0;

            }
            SellerBooksService
                .createBook({
                    owner:vm.userId,
                    title:bookToAdd.volumeInfo.title,
                    author:processAuthor(bookToAdd.volumeInfo.authors),
                    price: price,//vm.bookPrice,
                    description:document.getElementById('sellerbookdesc'+bookToAdd.id).value,
                    imgsrc:imageRefactor(bookToAdd.volumeInfo.imageLinks.smallThumbnail) ,
                    imglrgsrc : imageRefactor(bookToAdd.volumeInfo.imageLinks.thumbnail)})
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

        function imageRefactor(imgSrc) {
            if(imgSrc==null || imgSrc==undefined || imgSrc==""){
                imgSrc="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjF8MjE-anTAhUH6IMKHX0jAdEQjRwIBw&url=http%3A%2F%2Fmain-cast.wikia.com%2Fwiki%2FFile%3ASorry-image-not-available.png&psig=AFQjCNEQATdHcdrKMaqEEnpqQ4RvwZZJPQ&ust=1492465539835856";
            }
            return imgSrc;
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
                    if(response.data.items[i].volumeInfo.imageLinks==null || response.data.items[i].volumeInfo.imageLinks==undefined || response.data.items[i].volumeInfo.imageLinks==""){
                        response.data.items[i].volumeInfo.imageLinks={};
                        response.data.items[i].volumeInfo.imageLinks.smallThumbnail=="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjF8MjE-anTAhUH6IMKHX0jAdEQjRwIBw&url=http%3A%2F%2Fmain-cast.wikia.com%2Fwiki%2FFile%3ASorry-image-not-available.png&psig=AFQjCNEQATdHcdrKMaqEEnpqQ4RvwZZJPQ&ust=1492465539835856";
                        response.data.items[i].volumeInfo.imageLinks.thumbnail=="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjF8MjE-anTAhUH6IMKHX0jAdEQjRwIBw&url=http%3A%2F%2Fmain-cast.wikia.com%2Fwiki%2FFile%3ASorry-image-not-available.png&psig=AFQjCNEQATdHcdrKMaqEEnpqQ4RvwZZJPQ&ust=1492465539835856";
                    }
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
